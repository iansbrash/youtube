"use server";

import { actionClientWithErrorHandling } from "./action-client-with-error-handling";

export const exampleErroringAction = actionClientWithErrorHandling.action(
  async ({ parsedInput }) => {
    throw new Error("This is an error");
  },
);
