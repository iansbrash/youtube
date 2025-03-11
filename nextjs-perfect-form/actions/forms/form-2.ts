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
    // For demo purposes, we're updating a hardcoded user
    // In a real app, you'd get the user ID from the session
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name: result.data.name },
    });

    revalidatePath("/forms/2");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update name" };
  }
}
