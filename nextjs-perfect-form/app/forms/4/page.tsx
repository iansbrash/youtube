import { DirtyForm } from "@/components/examples/form-4/dirty-state";
import { BaseForm } from "@/components/examples/form-4/base";
import { ProtectionForm } from "@/components/examples/form-4/protection";
import { CombinedForm } from "@/components/examples/form-4/combined";
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

      <div className="pt-8 border-t">
        <h2 className="mb-8 text-2xl font-bold">Combined Form</h2>
        <p className="mb-8 text-muted-foreground">
          This form combines all the features from above: safe actions, dirty
          state management, and navigation protection.
        </p>
        <CombinedForm defaultValues={defaultValues} />
      </div>
    </div>
  );
}
