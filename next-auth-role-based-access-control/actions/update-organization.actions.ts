"use server";

import { withActionAuth } from "@/lib/with-action-auth";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";

export const updateOrganizationAction = async ({ name }: { name: string }) => {
  const { organization } = await withActionAuth({ roles: ["ADMIN", "OWNER"] });

  const updatedOrg = await prisma.organization.update({
    where: { id: organization.id },
    data: { name },
  });

  revalidatePath(`/${organization.uniqueId}`);

  return updatedOrg;
};
