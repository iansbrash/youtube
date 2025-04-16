import { prisma } from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      apiKey: "n/a",
      sendVerificationRequest: ({ url }) => {
        console.log("login url", url);
      },
    }),
  ],
  events: {},
});
