import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z, ZodError } from "zod";
import {
  analyticsMiddleware,
  authenticationMiddleware,
  authorizationMiddleware,
  rateLimitingMiddleware,
  sentryMiddleware,
} from "./safe-action-middleware";
import {
  DATABASE_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from "./safe-action-helpers";
import { Duration } from "@upstash/ratelimit";
import { Prisma } from "@prisma/client";
import { genericAuthorizationMiddlewareProps } from "./generic-middleware";

// To match the redis rate limiter schema.
const durationSchema = z
  .string()
  .regex(/^\d+\s*[mshd]{1,2}$/, "Invalid duration format")
  .refine((val): val is Duration => {
    const [num, unit] = val.split(/\s+/).filter(Boolean);
    return (
      !isNaN(Number(num)) && ["ms", "s", "m", "h", "d"].includes(unit as string)
    );
  }, "Duration must be a number followed by a valid unit (ms, s, m, h, d)");

export const actionClientWithMeta = createSafeActionClient({
  // TODO: Check if this runs on the client (so we capture the error via Sentry correctly)
  handleServerError(e) {
    if (e instanceof ZodError) {
      console.error(e.message);
      return VALIDATION_ERROR_MESSAGE;
    } else if (
      e instanceof Prisma.PrismaClientInitializationError ||
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientUnknownRequestError ||
      e instanceof Prisma.PrismaClientValidationError
    ) {
      console.error(e.message);
      return DATABASE_ERROR_MESSAGE;
    } else if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),

      // Figure out how this is used (check Midday)
      // This is used to track events in OpenPanel or Posthog
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),

      limiter: z
        .object({
          tokens: z.number(),
          window: durationSchema,
        })
        .optional(),
    });
  },
});

export const noauthActionClient = actionClientWithMeta
  // Logging
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: undefined });

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev") {
      console.debug({ clientInput }, "Input");
      console.debug({ result: result.data }, "Result");
      console.debug({ metadata }, "Metadata");
    }

    return result;
  })
  .use(rateLimitingMiddleware)
  .use(sentryMiddleware);

export const authActionClient = <P extends genericAuthorizationMiddlewareProps>(
  props: P,
) =>
  actionClientWithMeta
    // Logging
    .use(async ({ next, clientInput, metadata }) => {
      const result = await next({ ctx: undefined });

      if (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev") {
        console.debug({ clientInput }, "Input");
        console.debug({ result: result.data }, "Result");
        console.debug({ metadata }, "Metadata");
      }

      return result;
    })
    // Rate limiting
    .use(rateLimitingMiddleware)
    // Authentication
    .use(authenticationMiddleware())
    .use(authorizationMiddleware(props))
    // Analytics, which depends on auth
    .use(analyticsMiddleware)
    .use(sentryMiddleware);
