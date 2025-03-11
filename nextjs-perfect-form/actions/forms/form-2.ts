"use server";

import { revalidatePath } from "next/cache";
import { nameSchema } from "../schema";
import { prisma } from "@/prisma/client";
import { z } from "zod";
import { auth } from "@/config/auth";

export async function updateName(values: z.infer<typeof nameSchema>) {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  const result = nameSchema.safeParse(values);
  if (!result.success) {
    return { error: "Invalid input" };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: result.data.name },
    });

    revalidatePath("/forms/3");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update name" };
  }
}
