import { auth } from "@/config/auth";
import { Session } from "@/lib/auth/types";
import { createMiddleware } from "next-safe-action";

export const authenticationMiddleware = createMiddleware<{
  metadata: { name: string };
}>().define(async ({ next }) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return next({
    ctx: {
      // Note the cast here
      session: session as Session,
    },
  });
});
