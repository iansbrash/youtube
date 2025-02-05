"use server";

import { signOut } from "@/config/auth";
import { authActionClient } from "../safe-action";
import { z } from "zod";

export const signOutAction = authActionClient({
  plans: "ALL",
  roles: "ALL",
  withOrganization: true,
})
  .metadata({
    name: "sign-out",
  })
  .schema(z.object({}))
  .action(async ({ ctx }) => {
    return await signOut({
      redirectTo: "/",
    });
  });
