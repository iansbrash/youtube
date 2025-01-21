import Dashboard from "@/components/dashboard";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function OrganizationDashboard({
	params,
}: {
	params: Promise<{ org_unique_id: string }>;
}) {
	const { org_unique_id } = await params;

	const session = await auth();

	if (!session?.user?.id) {
		redirect("/signin");
	}

	const organization = await prisma.organization.findUnique({
		where: {
			uniqueId: org_unique_id,
			User_Organization: {
				some: {
					user_id: session.user.id,
				},
			},
		},
	});

	if (!organization) {
		redirect("/organizations");
	}

	return <Dashboard organization={organization} />;
}
