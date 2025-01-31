import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import ActionsPage from "@/components/actions-page";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return <div>Not logged in</div>;
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session.user.id,
    },
  });

  return <ActionsPage user={user} />;
}
