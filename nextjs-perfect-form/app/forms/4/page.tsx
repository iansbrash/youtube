import { Form4 } from "@/components/examples/form-4";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function FormPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true },
  });

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-8 text-2xl font-bold">Advanced Form Example</h1>
      <Form4 defaultValues={{ name: user?.name ?? "" }} />
    </div>
  );
}
