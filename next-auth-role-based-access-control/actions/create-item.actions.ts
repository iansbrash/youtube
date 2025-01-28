"use server";

import { Role, withActionAuth } from "@/lib/with-action-auth";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";

export const createItemAction = async () => {
  const { organization } = await withActionAuth({
    roles: ["USER", "ADMIN", "OWNER"],
  });

  const name = new Date().toLocaleString();

  const item = await prisma.exampleItem.create({
    data: {
      name,
      organization_id: organization.id,
    },
  });

  revalidatePath(`/${organization.uniqueId}`);
  revalidatePath(`/${organization.uniqueId}/actions`);

  return item;
};

export const createItemProtectedAction = async () => {
  const { organization } = await withActionAuth({
    roles: ["SOME_OTHER_ROLE" as Role],
  });

  // ... this will never get reached
  console.log("Organization: ", organization);
};
