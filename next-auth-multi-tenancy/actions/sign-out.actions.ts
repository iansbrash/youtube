"use server"

import { signOut } from "@/config/auth";

export const signOutAction = async () => {
    return await signOut({
        redirectTo: "/"
    })
};