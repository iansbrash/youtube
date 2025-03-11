"use server";

import { nameSchema } from "../schema";
import { prisma } from "@/prisma/client";
import { z } from "zod";
import { auth } from "@/config/auth";

export async function updateName(values: z.infer<typeof nameSchema>) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const result = nameSchema.parse(values);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: result.name },
  });

  return { success: true };
}
