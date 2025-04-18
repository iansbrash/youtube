import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type UserSelect = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
  };
}>;

async function example1() {
  const userWithSelect = await prisma.user.findUnique({
    where: { email: "test@example.com" },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (userWithSelect) {
    console.log("User ID:", userWithSelect.id);
    console.log("User Email:", userWithSelect.name);
    // console.log(userWithSelect.emailVerified);
  }
}
