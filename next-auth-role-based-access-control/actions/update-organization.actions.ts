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
		where: {
			uniqueId: uniqueOrganizationId,
			User_Organization: { some: { user_id: session.user.id } },
		},
	});

	if (!organization) {
		throw new Error("Organization not found");
	}

	const updatedOrg = await prisma.organization.update({
		where: { id: organization.id },
		data: { name },
	});

	revalidatePath(`/${uniqueOrganizationId}`);

	return updatedOrg;
};
