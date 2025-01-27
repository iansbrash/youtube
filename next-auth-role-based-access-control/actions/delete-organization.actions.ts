"use server";

import { withActionAuth } from "@/lib/with-action-auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export const deleteOrganizationAction = async () => {
  const { organization } = await withActionAuth({ roles: ["OWNER"] });

  await prisma.organization.delete({
    where: { id: organization.id },
  });

  redirect("/organizations");
};
