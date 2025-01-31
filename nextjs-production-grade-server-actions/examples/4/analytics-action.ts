"use server";

import { z } from "zod";
import { actionClientWithMeta } from "./action-client-with-meta";
import { authenticationMiddleware } from "@/actions/middleware/authentication.middleware";
import { analyticsMiddleware } from "@/actions/middleware/analytics.middleware";

const analyticsExampleSchema = z.object({});

export const analyticsExampleAction = actionClientWithMeta
  .metadata({
    name: "analytics-example-action",
    track: {
      // This is the event name that will be sent to Posthog
      event: "analytics-example-action",
      // Can include other metadata
      channel: "web",
    },
  })
  .use(authenticationMiddleware)

  // Needs to be authed for analytics to work
  // This is because we associate the event with a user in Posthog
  .use(analyticsMiddleware)
  .schema(analyticsExampleSchema)
  .action(async ({ parsedInput, ctx }) => {
    return {
      success: true,
    };
  });
