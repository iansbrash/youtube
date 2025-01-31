"use server";

import { z } from "zod";
import { actionClientWithMeta } from "./action-client-with-meta";
import { rateLimitingMiddleware } from "@/actions/middleware/ratelimit.middleware";

const rateLimitExampleSchema = z.object({});

export const rateLimitExampleAction = actionClientWithMeta
  .metadata({
    name: "rate-limit-example-action",
  })
  .use(rateLimitingMiddleware)
  .schema(rateLimitExampleSchema)
  .action(async ({ parsedInput, ctx }) => {
    return {
      success: true,
    };
  });
