import { WithAuth } from "@/lib/with-auth";

import { prisma } from "@/prisma/client";
import ActionsDemoPage from "@/components/actions-demo-page";

export default async function ActionsPage() {
  return (
    <WithAuth>
      {async ({ userOrganization, organization }) => {
        const items = await prisma.exampleItem.findMany({
          where: {
            organization: {
              uniqueId: organization.uniqueId,
            },
          },
          orderBy: {
            name: "asc",
          },
        });

        return (
          <ActionsDemoPage userOrganization={userOrganization} items={items} />
        );
      }}
    </WithAuth>
  );
}
