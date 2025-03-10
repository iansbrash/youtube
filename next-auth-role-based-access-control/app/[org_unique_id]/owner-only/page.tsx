import { WithAuth } from "@/lib/with-auth";
import { prisma } from "@/prisma/client";

export default async function OwnerOnlyPage() {
  return (
    <WithAuth>
      {async ({ organization, userOrganization }) => {
        if (userOrganization.role !== "OWNER") {
          return (
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <h2 className="text-xl font-semibold text-red-600">
                Access Denied
              </h2>
              <p className="text-gray-600">
                You must be an owner to view this page
              </p>
            </div>
          );
        }

        return (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Owner Only Page</h2>
            <p>Welcome, organization owner!</p>
            <p>Organization ID: {organization.id}</p>
            <p>Organization Name: {organization.name}</p>
          </div>
        );
      }}
    </WithAuth>
  );
}
