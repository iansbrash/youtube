import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z, ZodError } from "zod";
import {
  DATABASE_ERROR_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from "./safe-action-helpers";
import { Duration } from "@upstash/ratelimit";
import { Prisma } from "@prisma/client";
import { genericAuthorizationMiddlewareProps } from "./generic-middleware";
import { rateLimitingMiddleware } from "./middleware/ratelimit.middleware";
import {
  loggingMiddleware,
  sentryMiddleware,
} from "./middleware/observability.middleware";
import { authenticationMiddleware } from "./middleware/authentication.middleware";
import { analyticsMiddleware } from "./middleware/analytics.middleware";
import { complexAuthorizationMiddleware } from "./middleware/authorization-complex.middleware";

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

// Base client which has server error handling, and metadata
export const actionClientWithMeta = createSafeActionClient({
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
  .use(loggingMiddleware)

  // Rate limiting
  .use(rateLimitingMiddleware)

  // Observability
  .use(sentryMiddleware);

export const authActionClient = <P extends genericAuthorizationMiddlewareProps>(
  props: P,
) =>
  actionClientWithMeta
    // Logging
    .use(loggingMiddleware)

    // Rate limiting
    .use(rateLimitingMiddleware)

    // Authentication
    .use(authenticationMiddleware)
    .use(complexAuthorizationMiddleware(props))

    // Analytics, which depends on auth
    .use(analyticsMiddleware)

    // Observability
    .use(sentryMiddleware);
