"use client";

import { updateOrganizationAction } from "@/actions/update-organization.actions";
import type { Organization } from "@prisma/client";

interface DashboardProps {
  organization: Organization;
}

export default function Dashboard({ organization }: DashboardProps) {
  const { name } = organization;

  const handleSave = async (formData: FormData) => {
    const newName = formData.get("name") as string;

    await updateOrganizationAction({
      name: newName,
    });

    alert("Organization name updated");
  };

  return (
    <div>
      <h1>Organization Page</h1>
      <form action={handleSave}>
        <input
          type="text"
          name="name"
          placeholder="Organization name"
          className="text-gray-800 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          defaultValue={name}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
