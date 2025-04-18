import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateArgs["data"] = {
  email: "annotated@example.com",
};

const userArgs: Prisma.UserSelect = {
  id: true,
  email: true,
  role: true,
};

type UserSelect = Prisma.UserGetPayload<{
  select: typeof userArgs;
}>;

async function example2() {
  // Type Checking:
  // 1. Structural errors ARE caught:
  // userArgs.data.emal = "typo@example.com"; // <-- TS Error: Object literal may only specify known properties...
  // userArgs.nonExistentProp = {}; // <-- TS Error

  const email = userData.email;
  const emailVerified = userData.emailVerified;

  const role = userData.role;
  console.log(`Role: ${role}`);

  console.log(
    "User Args (structure checked, but types widened):",
    JSON.stringify(userArgs, null, 2),
  );

  userArgs.emailVerified = true;
  // userArgs.emailVerified = false;

  const createdUser = await prisma.user.create({
    data: userData,
    select: userArgs,
  });
}

example2().catch(console.error);
