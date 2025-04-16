import { PrismaClient, Prisma, OrganizationRole } from "@prisma/client";

const prisma = new PrismaClient();

async function example2() {
  const userArgs: Prisma.UserCreateArgs = {
    data: {
      email: "annotated@example.com",
      name: "Annotated User",
      role: OrganizationRole.ADMIN,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  };

  // Type Checking:
  // 1. Structural errors ARE caught:
  // userArgs.data.emal = "typo@example.com"; // <-- TS Error: Object literal may only specify known properties...
  // userArgs.nonExistentProp = {}; // <-- TS Error

  const email = userArgs.data.email;

  const role = userArgs.data.role;
  console.log(`Role: ${role}`);

  console.log(
    "User Args (structure checked, but types widened):",
    JSON.stringify(userArgs, null, 2),
  );

  const createdUser = await prisma.user.create(userArgs);
}

example2().catch(console.error);
