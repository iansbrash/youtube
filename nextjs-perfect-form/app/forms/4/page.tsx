import { DirtyForm } from "@/components/examples/form-4/dirty-state";
import { BaseForm } from "@/components/examples/form-4/base";
import { ProtectionForm } from "@/components/examples/form-4/protection";
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

  const defaultValues = { name: user?.name ?? "" };

  return (
    <div className="mx-auto max-w-2xl space-y-12 p-4">
      <div>
        <h2 className="mb-8 text-2xl font-bold">
          Basic Form with Safe Actions
        </h2>
        <BaseForm defaultValues={defaultValues} />
      </div>

      <div>
        <h2 className="mb-8 text-2xl font-bold">Form with Dirty State</h2>
        <DirtyForm defaultValues={defaultValues} />
      </div>

      <div>
        <h2 className="mb-8 text-2xl font-bold">
          Form with Navigation Protection
        </h2>
        <ProtectionForm defaultValues={defaultValues} />
      </div>
    </div>
  );
}
