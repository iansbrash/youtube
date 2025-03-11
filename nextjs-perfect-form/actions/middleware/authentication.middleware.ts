import { auth } from "@/config/auth";
import { Session, User } from "next-auth";
import { createMiddleware } from "next-safe-action";

export const authenticationMiddleware = createMiddleware().define(
  async ({ next }) => {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    return next({
      ctx: {
        // Note the cast here
        session: session as Session & { user: User },
      },
    });
  },
);
