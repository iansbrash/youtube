import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function example1() {
  const userWithSelect = await prisma.user.findUnique({
    where: { email: "test@example.com" },
    select: {
      id: true,
      email: true,
    },
  });

  if (userWithSelect) {
    console.log("User ID:", userWithSelect.id);
    console.log("User Email:", userWithSelect.email);
    // console.log(userWithSelect.name);
  }
}
