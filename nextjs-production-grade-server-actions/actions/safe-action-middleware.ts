import { createMiddleware } from "next-safe-action";
import * as Sentry from "@sentry/nextjs";
import {
  genericAnalyticsMiddleware,
  genericAuthenticationMiddleware,
  genericAuthorizationMiddleware,
  genericAuthorizationMiddlewareProps,
  genericRateLimitingMiddleware,
} from "@/actions/generic-middleware";
import type { Duration } from "@upstash/ratelimit";
import { Session } from "@/lib/auth/types";

export const sentryMiddleware = createMiddleware<{
  metadata: { name: string };
}>().define(async ({ next, metadata }) => {
  return Sentry.withServerActionInstrumentation(metadata.name, async () => {
    return next({
      ctx: {},
    });
  });
});

export const analyticsMiddleware = createMiddleware<{
  metadata: {
    name: string;
    track?: {
      event: string;
      channel: string;
    };
  };
  ctx: {
    session: Session;
  };
}>().define(async ({ next, metadata, ctx }) => {
  return next({
    ctx: {
      ...(await genericAnalyticsMiddleware({
        track: metadata.track,
        session: ctx.session,
      })),
    },
  });
});

// This middleware works with clients that at minimum have `ctx.foo`, `metadata.actionName`
// and `serverError.message` properties. More information below. *
export const rateLimitingMiddleware = createMiddleware<{
  metadata: { name: string; limiter?: { tokens: number; window: Duration } };
}>().define(async ({ next, metadata }) => {
  return next({
    ctx: {
      ...(await genericRateLimitingMiddleware({
        name: metadata.name,
        channel: "action",
        limiter: metadata.limiter,
      })),
    },
  });
});

export const authorizationMiddleware = <
  P extends genericAuthorizationMiddlewareProps,
>(
  props: P,
) =>
  createMiddleware<{
    metadata: { name: string };
    ctx: {
      session: Session;
    };
  }>().define(async ({ next, ctx }) => {
    const { session } = ctx;

    return next({
      ctx: {
        ...(await genericAuthorizationMiddleware({
          ...props,
          session,
        })),
      },
    });
  });

export const authenticationMiddleware = () =>
  createMiddleware<{
    metadata: { name: string };
  }>().define(async ({ next }) => {
    return next({
      ctx: {
        ...(await genericAuthenticationMiddleware()),
      },
    });
  });
