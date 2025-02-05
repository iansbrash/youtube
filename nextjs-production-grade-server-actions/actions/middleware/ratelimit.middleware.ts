import redisClient from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { Duration } from "@upstash/ratelimit";
import { createMiddleware } from "next-safe-action";
import { headers } from "next/headers";

export const rateLimitingMiddleware = createMiddleware<{
  metadata: { name: string; limiter?: { tokens: number; window: Duration } };
}>().define(async ({ next, metadata }) => {
  const {
    limiter = {
      // Default to 5 requests per 10 seconds
      tokens: 5,
      window: "10s",
    },
    name,
  } = metadata;

  const channel = "action";

  const ratelimit = new Ratelimit({
    limiter: Ratelimit.fixedWindow(limiter.tokens, limiter.window),
    redis: redisClient,
  });

  // IP header used when deploying to Vercel
  const ip = (await headers()).get("x-forwarded-for");

  const { success, remaining } = await ratelimit.limit(
    `${ip}-${channel}-${name}`,
  );

  if (!success) {
    throw new Error("Too many requests");
  }

  return next({
    ctx: {
      ratelimit: {
        remaining,
      },
    },
  });
});
