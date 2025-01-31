import { Session } from "@/lib/auth/types";
import PostHogClient from "@/lib/posthog";
import { createMiddleware } from "next-safe-action";

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
  const { track } = metadata;

  if (track) {
    const posthog = PostHogClient();

    posthog.capture({
      distinctId: ctx.session.user.id!,
      event: track.event,
      properties: {},
    });

    await posthog.shutdown();
  }

  return next({
    ctx: {},
  });
});
