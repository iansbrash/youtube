import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userSelect = {
  id: true,
  email: true,
  role: true,
  emalVerfied: true,
}; // <-- Use satisfies here!

async function example3() {
  const email = userSelect.email;
  console.log(`Type of email variable: ${typeof email}, Value: ${email}`);

  // userSelect.emailVerified = true;

  const createdUser = await prisma.user.create({
    data: {
      email: "satisfies@example.com",
    },
    select: userSelect,
  });

  console.log("Created User ID:", createdUser.id);
  console.log("Created User Role:", createdUser.role);
  // console.log(createdUser.emailVerified); // <-- TS Error: Property 'emailVerified' does not exist...
}

example3().catch(console.error);
