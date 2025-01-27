import { redirect } from "next/navigation";

import { headers } from "next/headers";

import { prisma } from "@/prisma/client";
import { auth } from "@/config/auth";
import { Organization, User, User_Organization } from "@prisma/client";
import { Session } from "next-auth";
import { JSX } from "react";

type WithAuthChildrenProps = {
  organization: Organization;
  session: Session;
  userOrganization: User_Organization;
  user: User;
};

interface WithAuthProps {
  children:
    | ((props: WithAuthChildrenProps) => JSX.Element)
    | ((props: WithAuthChildrenProps) => Promise<JSX.Element>)
    | JSX.Element;
  onError?: (error: Error) => JSX.Element;
}

export async function WithAuth({ children, onError }: WithAuthProps) {
  try {
    const uniqueOrgId = (await headers()).get("x-unique-org-id");
    const session = await auth();

    if (!session?.user?.id) {
      return redirect("/signin");
    }

    if (!uniqueOrgId) {
      return redirect("/organizations");
    }

    const userId = session.user.id;

    const organization = await prisma.organization.findUnique({
      where: {
        uniqueId: uniqueOrgId,
        User_Organization: {
          some: {
            user_id: userId,
          },
        },
      },
      include: {
        User_Organization: {
          where: {
            user_id: userId,
          },
          include: {
            user: true,
          },
        },
      },
    });

    if (!organization) {
      return redirect("/organizations");
    }

    const userOrganization = organization.User_Organization[0];

    return typeof children === "function" ? (
      children({
        organization,
        session,
        userOrganization,
        user: userOrganization.user,
      })
    ) : (
      <>{children}</>
    );
  } catch (error) {
    if (onError && error instanceof Error) {
      return onError(error);
    }

    // Optionally, render some fallback UI
    // return <div>Error</div>;

    throw error;
  }
}
