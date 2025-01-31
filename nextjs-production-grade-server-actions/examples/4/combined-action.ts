"use server";

import { z } from "zod";
import { actionClientWithMeta } from "./action-client-with-meta";
import { authenticationMiddleware } from "@/actions/middleware/authentication.middleware";
import { simpleAuthorizationMiddleware } from "@/actions/middleware/authorization-simple.middleware";
import { analyticsMiddleware } from "@/actions/middleware/analytics.middleware";
import { loggingMiddleware } from "@/actions/middleware/observability.middleware";
import { sentryMiddleware } from "@/actions/middleware/observability.middleware";
import { rateLimitingMiddleware } from "@/actions/middleware/ratelimit.middleware";

const combinedMiddlewareExampleSchema = z.object({});

export const combinedMiddlewareExampleAction = actionClientWithMeta
  .metadata({
    name: "combined-middleware-example-action",
  })
  .use(loggingMiddleware)
  .use(rateLimitingMiddleware)
  .use(authenticationMiddleware)
  .use(
    simpleAuthorizationMiddleware({
      plans: ["PRO"],
      roles: "ALL",
    }),
  )
  .use(analyticsMiddleware)
  .use(sentryMiddleware)
  .schema(combinedMiddlewareExampleSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx;

    // Do some logic. Maybe update the name
    // await prisma.user.update({ ... })

    return user;
  });
