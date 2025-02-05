"use server";

import { signIn } from "@/config/auth";
import { noauthActionClient } from "../safe-action";
import { z } from "zod";

export const signInAction = noauthActionClient
  .metadata({
    name: "sign-in",
  })
  .schema(
    z.object({
      email: z.string().email(),
    }),
  )
  .action(async ({ parsedInput }) => {
    return await signIn("resend", {
      email: parsedInput.email,
      redirectTo: "/organizations",
    });
  });
