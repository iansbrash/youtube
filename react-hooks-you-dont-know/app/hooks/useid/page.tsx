"use client";

import { useId } from "react";

// This component will be rendered on the client
function ClientFormField({ label }: { label: string }) {
  const id = useId();

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// This component will be rendered on the server
async function ServerFormField({ label }: { label: string }) {
  const id = useId();

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default function UseIdDemo() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">useId Toy Example</h1>
      <p className="mb-4">
        This example demonstrates how useId generates stable, unique IDs that
        work across server and client rendering.
      </p>

      <div className="space-y-8">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-4">Client-Side Form Fields</h2>
          <div className="space-y-4">
            <ClientFormField label="First Name" />
            <ClientFormField label="Last Name" />
            <ClientFormField label="Email" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-4">Server-Side Form Fields</h2>
          <div className="space-y-4">
            <ServerFormField label="Username" />
            <ServerFormField label="Password" />
            <ServerFormField label="Confirm Password" />
          </div>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">What's happening?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              useId generates unique, stable IDs that work in both client and
              server components
            </li>
            <li>The IDs remain consistent across re-renders and hydration</li>
            <li>Each instance of a component gets its own unique ID</li>
            <li>
              Perfect for accessibility attributes like htmlFor and
              aria-labelledby
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
