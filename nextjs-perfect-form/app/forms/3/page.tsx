import { BaseForm3 } from "@/components/examples/form-3/base";
import { DirtyForm } from "@/components/examples/form-3/dirty-state";
import { ProtectionForm } from "@/components/examples/form-3/protection";
import { CombinedForm } from "@/components/examples/form-3/combined";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function FormPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-8">
      <FormContent />
    </div>
  );
}

async function FormContent() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { name: true },
  });

  const defaultValues = { name: user.name ?? "" };

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Basic Form Example</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Demonstrates type-safe server actions and basic form validation.
        </p>
        <div className="mt-4">
          <BaseForm3 defaultValues={defaultValues} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Form with Dirty State</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Adds visual indicators for unsaved changes and reset functionality.
        </p>
        <div className="mt-4">
          <DirtyForm defaultValues={defaultValues} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Form with Navigation Protection</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Adds browser-level protection against losing unsaved changes.
        </p>
        <div className="mt-4">
          <ProtectionForm defaultValues={defaultValues} />
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-medium">Combined Form Example</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Combines all features: type-safe actions, dirty state management, and
          navigation protection.
        </p>
        <div className="mt-4">
          <CombinedForm defaultValues={defaultValues} />
        </div>
      </div>
    </>
  );
}
