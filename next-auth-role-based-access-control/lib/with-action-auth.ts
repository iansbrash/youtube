import "server-only";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type Role = "USER" | "ADMIN" | "OWNER";

interface WithActionAuthProps {
	roles: Role[] | "ALL";
}

export const withActionAuth = async ({ roles }: WithActionAuthProps) => {
	const session = await auth();

	if (!session?.user?.id) {
		redirect("/signin");
	}

	const uniqueOrganizationId = (await headers()).get("x-unique-org-id");

	if (!uniqueOrganizationId) {
		redirect("/signin");
	}

	const organization = await prisma.organization.findUnique({
		where: {
			uniqueId: uniqueOrganizationId,
			User_Organization: { some: { user_id: session.user.id } },
		},
		include: {
			User_Organization: {
				where: { user_id: session.user.id },
				include: {
					user: true,
				},
			},
		},
	});

	if (!organization) {
		throw new Error("Organization not found");
	}

	const userOrganization = organization.User_Organization[0];

	if (roles === "ALL") {
		return {
			user: userOrganization.user,
			organization,
		};
	}

	if (!roles.includes(userOrganization.role as Role)) {
		throw new Error("You do not have the required role to perform this action");
	}

	return {
		user: userOrganization.user,
		userOrganization,
		organization,
		session,
	};
};
