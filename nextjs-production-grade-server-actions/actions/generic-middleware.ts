// Peer dependency
import { headers } from "next/headers";
import {
  Organization,
  OrganizationPlan,
  OrganizationRole,
  User,
} from "@prisma/client";
import { prisma } from "@/prisma/client";
import { Session } from "@/lib/auth/types";

interface BaseReturn {
  user: User;
}

interface AuthorizedReturn extends BaseReturn {
  organization: Organization;
}

interface UnauthorizedReturn extends BaseReturn {
  organization: Organization | null;
}

type AuthorizationReturn<O extends boolean> = O extends true
  ? AuthorizedReturn
  : UnauthorizedReturn;

export type genericAuthorizationMiddlewareProps =
  | {
      withOrganization: true;
      plans: OrganizationPlan[] | "ALL";
      roles: OrganizationRole[] | "ALL";
    }
  | {
      withOrganization: false;
      plans?: never;
      roles?: never;
    };

export const genericAuthorizationMiddleware = async <
  P extends genericAuthorizationMiddlewareProps,
>(
  props: P & {
    session: Session;
  },
): Promise<
  AuthorizationReturn<P extends { withOrganization: true } ? true : false>
> => {
  const uniqueOrganizationId = (await headers()).get("x-unique-org-id");

  const { session } = props;

  if (!uniqueOrganizationId && props.withOrganization) {
    // If this endpoint requires information about a user's role or organization plan,
    // we need the organization id, and thus, must throw an error if it doesn't exist
    throw new Error("User is not in an organization");
  }

  const userId = session.user.id;

  // Check if the user/org/role/plan combination is valid
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      User_Organization: {
        include: {
          organization: true,
        },
      },
    },
  });

  const foundOrganization = user?.User_Organization.find(
    (uo) => uo.organization.uniqueId === uniqueOrganizationId,
  );

  const organization = foundOrganization?.organization;

  if (props.withOrganization) {
    if (!organization) {
      throw new Error("User is not in an organization");
    }

    const { plans, roles } = props;
    // Lets us specify a list of plans that are allowed (i.e. enterprise-only actions)
    if (plans !== "ALL" && !plans.some((p) => p === organization?.plan)) {
      // User might not be in an organization right now either
      throw new Error("Organization is not the correct plan");
    }

    if (roles !== "ALL" && !roles.some((r) => foundOrganization.role === r)) {
      throw new Error("Unauthorized");
    }

    return {
      user: user,
      organization: organization,
    } as AuthorizationReturn<
      P extends {
        withOrganization: true;
      }
        ? true
        : false
    >;
  } else {
    return {
      user: user,
      organization,
    } as AuthorizationReturn<
      P extends {
        withOrganization: true;
      }
        ? true
        : false
    >;
  }
};
