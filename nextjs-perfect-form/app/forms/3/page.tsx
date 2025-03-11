import { BaseForm3 } from "@/components/examples/form-3/base";
import { CombinedForm } from "@/components/examples/form-3/combined";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

async function getFormData() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { name: true },
  });

  return {
    name: user.name ?? "",
  };
}

export default async function FormPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-8">
      <FormContent />
    </div>
  );
}

async function FormContent() {
  const data = await getFormData();

  return (
    <>
      <div>
        <h3 className="text-lg font-medium">Protection Form Example</h3>
        <div className="mt-8">
          <BaseForm3 defaultValues={data} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Combined Form Example</h3>
        <div className="mt-8">
          <CombinedForm defaultValues={data} />
        </div>
      </div>
    </>
  );
}
