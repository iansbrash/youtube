import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";
import type { JSX } from "react";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";

const userInclude = {} satisfies Prisma.UserInclude;

type WithUserChildrenProps = {
    user: Prisma.UserGetPayload<{
        include: typeof userInclude;
    }>;
    session: Session;
};

interface WithUserProps {
    children:
        | ((props: WithUserChildrenProps) => JSX.Element)
        | ((props: WithUserChildrenProps) => Promise<JSX.Element>)
        | JSX.Element;
    onError?: (error: Error) => JSX.Element;
}

export async function WithUser({
    children,
    onError,
}: WithUserProps) {
    try {
        const session = await auth();

        const user_id = session?.user?.id;

        if (!user_id) {
            return redirect("/login");
        }


        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: user_id,
            },
            include: userInclude,
        });

        

        return typeof children === "function" ? (
            children({ user, session })
        ) : (
            <>{children}</>
        );
    } catch (error) {
        if (onError && error instanceof Error) {
            return onError(error);
        }

        // Render a fallback, or throw it
        // return <div>Error</div>;
        throw error;
    }
}
