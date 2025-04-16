import { PrismaClient, Prisma, OrganizationRole } from "@prisma/client";

const prisma = new PrismaClient();

async function example3() {
  const userArgs = {
    data: {
      email: "satisfies@example.com",
      name: "Satisfies User",
      role: OrganizationRole.USER,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  } satisfies Prisma.UserCreateArgs; // <-- Use satisfies here!

  // 2. Type Preservation (The Key Benefit!):
  const email = userArgs.data.email;
  console.log(`Type of email variable: ${typeof email}, Value: ${email}`);

  // Hover over `userArgs.data.role`. TypeScript knows it's specifically
  // `OrganizationRole.USER`, NOT the wider `OrganizationRole | undefined`.
  const role = userArgs.data.role;

  const createdUser = await prisma.user.create(userArgs);

  console.log("Created User ID:", createdUser.id);
  console.log("Created User Role:", createdUser.role);
  // console.log(createdUser.name); // <-- TS Error: Property 'name' does not exist...
}

example3().catch(console.error);
