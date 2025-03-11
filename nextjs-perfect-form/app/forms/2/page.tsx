import { Form2 } from "@/components/examples/form-2";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function FormPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { name: true },
  });

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-8 text-2xl font-bold">Styled Form Example</h1>
      <Form2 defaultValues={{ name: user.name ?? "" }} />
    </div>
  );
}
