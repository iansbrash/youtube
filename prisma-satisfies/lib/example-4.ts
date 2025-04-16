import { Prisma } from "@prisma/client";
import { prisma } from "./client";

async function findUserAndEnhance<T extends Prisma.UserSelect>(args: T) {
  const user = await prisma.user.findFirst({
    select: args,
  });

  if (!user) {
    return null;
  }

  return { ...user, queryArgs: args };
}

async function runExamples() {
  // Example 4.2: Using the enhanced function
  const enhancedUserArgs = {
    accounts: { select: { provider: true } }, // Select only provider from accounts
  } satisfies Prisma.UserSelect;

  const user2 = await findUserAndEnhance(enhancedUserArgs);

  if (user2) {
    console.log("Enhanced user account provider:", user2.accounts[0]?.provider);
    // console.log(user2.accounts[0].type); // <-- TS Error: Property 'type' does not exist
    console.log("Query args used:", user2.queryArgs);
  }
}

runExamples().catch(console.error);
