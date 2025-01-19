"use server";

import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const updateOrganizationAction = async ({ name }: { name: string }) => {
	const session = await auth();

	if (!session?.user?.id) {
		redirect("/signin");
	}

	const uniqueOrganizationId = (await headers()).get("x-unique-org-id");

	if (!uniqueOrganizationId) {
		redirect("/signin");
	}

	const organization = await prisma.organization.findUnique({
		where: { uniqueId: uniqueOrganizationId },
	});

	if (!organization) {
		redirect("/signin");
	}

	const userOrganization = await prisma.user_Organization.findUnique({
		where: {
			user_id_organization_id: {
				user_id: session.user.id,
				organization_id: organization.id,
			},
		},
		include: {
			organization: true,
		},
	});

	if (!userOrganization) {
		throw new Error("User is not a member of this organization");
	}

	const updatedOrg = await prisma.organization.update({
		where: { id: organization.id },
		data: { name },
	});

	revalidatePath(`/${uniqueOrganizationId}`);

	return updatedOrg;
};
