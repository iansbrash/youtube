"use server";

import { z } from "zod";
import { actionClientWithErrorHandling } from "./action-client-with-error-handling";
import { prisma } from "@/prisma/client";

export const exampleErroringAction = actionClientWithErrorHandling.action(
  async ({ parsedInput }) => {
    // Zod error
    // z.string().parse(123);

    // Prisma error
    await prisma.user.findUniqueOrThrow({
      where: {
        id: "123",
      },
    });

    // Generic error
    throw new Error("This is an error");
  },
);
