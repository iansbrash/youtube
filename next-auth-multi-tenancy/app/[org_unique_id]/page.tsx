import Dashboard from "@/components/dashboard";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function OrganizationDashboard({
	params,
}: {
	params: Promise<{ org_unique_id: string }>;
}) {
	const { org_unique_id } = await params;
	const organization = await prisma.organization.findUnique({
		where: {
			uniqueId: org_unique_id,
		},
	});

	if (!organization) {
		redirect("/organizations");
	}

	return <Dashboard organization={organization} />;
}
