import { BaseForm3 } from "@/components/examples/form-3/base";
import { CombinedForm } from "@/components/examples/form-3/combined";
import { auth } from "@/config/auth";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getFormData() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  // Simulate some delay to show loading state
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
      <Suspense fallback={<FormSkeleton />}>
        <FormContent />
      </Suspense>
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

function FormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-4 w-[250px] animate-pulse rounded-md bg-muted" />
        <div className="space-y-2.5">
          <div className="h-4 w-[100px] animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-[300px] animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-10 w-[100px] animate-pulse rounded-md bg-muted" />
      </div>

      <div className="space-y-4">
        <div className="h-4 w-[250px] animate-pulse rounded-md bg-muted" />
        <div className="space-y-2.5">
          <div className="h-4 w-[100px] animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-[300px] animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-10 w-[100px] animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
