"use server";

import { authActionClient } from "@/actions/safe-action";
import { combinedFormSchema } from "@/actions/schema";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";

export const updateCombinedFormAction = authActionClient
  .schema(combinedFormSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { session } = ctx;
    const { name, ...formData } = parsedInput;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    // Log other form data (in a real app, you'd store this in the database)
    console.log("Form data:", formData);

    revalidatePath("/forms/3");
  });
