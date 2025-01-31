"use server";

import { z } from "zod";
import { actionClientWithMeta } from "./action-client-with-meta";
import {
  loggingMiddleware,
  sentryMiddleware,
} from "@/actions/middleware/observability.middleware";

const observabilityExampleSchema = z.object({
  someInput: z.string(),
  otherInput: z.number(),
});

export const observabilityExampleAction = actionClientWithMeta
  .metadata({
    name: "observability-example-action",
  })
  .use(loggingMiddleware)
  .use(sentryMiddleware)
  .schema(observabilityExampleSchema)
  .action(async ({ parsedInput, ctx }) => {
    // Both the input, metadata, and output will be logged
    // Sentry will also be notified of any errors
    return {
      someOutput: parsedInput.someInput + " Hello!",
      otherOutput: parsedInput.otherInput + 123,
    };
  });
