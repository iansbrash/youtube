"use server";

import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";

interface exampleBadActionProps {
  name: string;
}

export const exampleBadAction = async (params: exampleBadActionProps) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Do some logic
  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: params.name,
    },
  });

  return user;
};
