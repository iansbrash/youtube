"use client";

import {
  createItemAction,
  createItemProtectedAction,
} from "@/actions/create-item.actions";
import { deleteOrganizationAction } from "@/actions/delete-organization.actions";
import { ExampleItem, User_Organization } from "@prisma/client";

interface ActionsDemoPageProps {
  userOrganization: User_Organization;
  items: ExampleItem[];
}

const ActionsDemoPage = ({ userOrganization, items }: ActionsDemoPageProps) => {
  return (
    <div className="h-full flex items-center justify-center w-screen">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Actions Demo Page</h2>
          <p className="text-gray-600">Your role: {userOrganization.role}</p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => createItemAction()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Item (All Roles)
            </button>

            <button
              onClick={() => createItemProtectedAction()}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Create Protected Item (Will Fail)
            </button>

            <button
              onClick={() => deleteOrganizationAction()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Organization (Owner Only)
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Example Items</h2>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.id} className="p-4 border rounded">
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionsDemoPage;
