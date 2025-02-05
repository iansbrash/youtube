import { Session } from "@/lib/auth/types";
import { createMiddleware } from "next-safe-action";
import { prisma } from "@/prisma/client";
import { OrganizationRole } from "@prisma/client";
import { OrganizationPlan } from "@prisma/client";

export type simpleAuthorizationMiddlewareProps = {
  plans: OrganizationPlan[] | "ALL";
  roles: OrganizationRole[] | "ALL";
};

export const simpleAuthorizationMiddleware = (
  props: simpleAuthorizationMiddlewareProps,
) =>
  createMiddleware<{
    metadata: { name: string };
    ctx: {
      session: Session;
    };
  }>().define(async ({ next, ctx }) => {
    const { session } = ctx;

    const userId = session.user.id;

    // Check if the user/org/role/plan combination is valid
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const { plans, roles } = props;

    // Lets us specify a list of plans that are allowed (i.e. enterprise-only actions)
    if (plans !== "ALL" && !plans.some((p) => p === user?.plan)) {
      throw new Error("User is not the correct plan");
    }

    // Lets us specify a list of roles that are allowed (i.e. admin-only actions)
    if (roles !== "ALL" && !roles.some((r) => user?.role === r)) {
      throw new Error("User is not the correct role");
    }

    return next({
      ctx: {
        user: user,
      },
    });
  });
