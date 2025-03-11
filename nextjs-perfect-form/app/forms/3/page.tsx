import { CombinedForm } from "@/components/examples/form-3";
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

  return (
    <>
      <div className="border-t pt-8">
        <h3 className="text-lg font-medium">Combined Form Example</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Combines all features: type-safe actions, dirty state management, and
          navigation protection.
        </p>
        <div className="mt-4">
          <CombinedForm
            defaultValues={{
              name: user.name ?? "",
              title: "mr",
              notificationPreference: "email",
              marketingEmails: false,
              isPublicProfile: false,
              birthDate: new Date(),
              experienceLevel: 50,
            }}
          />
        </div>
      </div>
    </>
  );
}
