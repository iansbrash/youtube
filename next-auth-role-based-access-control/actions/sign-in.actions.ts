"use server";

import { signIn } from "@/config/auth";

export const signInAction = async (email: string) => {
  return await signIn("resend", {
    email,
    redirectTo: "/organizations",
  });
};
