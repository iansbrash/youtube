"use server";

import { z } from "zod";
import { simpleActionClient } from "./action-client";
import { prisma } from "@/prisma/client";
import { auth } from "@/config/auth";
import { revalidatePath } from "next/cache";

const exampleBetterSchema = z.object({
  name: z.string(),
});

export const exampleBetterAction = simpleActionClient
  .schema(exampleBetterSchema)
  .action(async ({ parsedInput }) => {
    const { name } = parsedInput;

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
        name,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    revalidatePath("/actions");

    return user;
  });
