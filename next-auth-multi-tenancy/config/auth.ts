import { RESERVED_PATHS } from "@/middleware"
import { prisma } from "@/prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
adapter: PrismaAdapter(prisma),  
  providers: [Resend({
    apiKey: "n/a",
    sendVerificationRequest: ({url}) => {
      console.log("login url", url)
    }
  })],
  events: {
    // next-auth will create the `User` object implicitly through the Prisma adapter
    createUser: async ({user}) => {
        console.log("createUser", user)
      if (!user.id) {
        throw new Error("User ID is required");
      }
      
      // Create two dummy organizations
      const org1 = await prisma.organization.create({
        data: {
            owner_user_id: user.id,
            name: "Org 1",
            uniqueId: await generateUniqueOrganizationId("org"),
            User_Organization: {
                create: {
                    user_id: user.id,
                }
            }
        }
      })

      const org2 = await prisma.organization.create({
        data: {
            owner_user_id: user.id,
            name: "Org 2",
            uniqueId: await generateUniqueOrganizationId("org"),
            User_Organization: {
                create: {
                    user_id: user.id,
                }
            }
        }
      })
    },
  }
})

async function generateUniqueOrganizationId(name: string) {
    // Convert name to base slug format and remove non-alphanumeric chars except dash
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9-]/g, "");

    if (baseSlug.length === 0) {
        throw new Error("Invalid organization name");
    }

    // First try with just the base slug
    const existingOrg = await prisma.organization.findUnique({
        where: { uniqueId: baseSlug },
    });

    if (!existingOrg && !RESERVED_PATHS.has(baseSlug)) {
        return baseSlug;
    }

    // If exists, try with incrementing numbers until we find a free one
    let counter = 1;
    while (true) {
        const newSlug = `${baseSlug}-${counter}`;
        const exists = await prisma.organization.findUnique({
            where: { uniqueId: newSlug },
        });

        if (!exists) {
            return newSlug;
        }
        counter++;
    }
}