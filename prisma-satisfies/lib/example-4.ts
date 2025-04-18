import { Prisma } from "@prisma/client";
import { prisma } from "./client";

const enhancedUserArgs = {
  accounts: { select: { provider: true } }, // Select only provider from accounts
} satisfies Prisma.UserSelect;

type EnhancedUserSelect = Prisma.UserGetPayload<{
  select: typeof enhancedUserArgs;
}>;

async function findUserAndEnhance<T extends Prisma.UserSelect>(args: T) {
  const user = await prisma.user.findFirst({
    select: args,
  });

  if (!user) {
    return null;
  }

  // Runs some more logic
  // Fetch from 3rd party API, etc
  // Accumulate some additional data that needs returning

  return { ...user, queryArgs: args };
}

async function runExamples() {
  const user = await findUserAndEnhance({
    name: true,
  });
  const user2 = await findUserAndEnhance(enhancedUserArgs);

  user?.name;
  // user.accounts;

  if (user2) {
    console.log("Enhanced user account provider:", user2.accounts[0]?.provider);
    // console.log(user2.accounts[0].type); // <-- TS Error: Property 'type' does not exist
    console.log("Query args used:", user2.queryArgs);
  }
}

runExamples().catch(console.error);
