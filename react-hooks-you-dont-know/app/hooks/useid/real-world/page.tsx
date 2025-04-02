"use client";

import { useId } from "react";

interface FormField {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}

// This component will be rendered on the server
async function DynamicFormField({ field }: { field: FormField }) {
  const id = useId();
  const errorId = useId();

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
        aria-describedby={errorId}
      >
        {field.label}
      </label>
      <input
        id={id}
        type={field.type}
        required={field.required}
        pattern={field.pattern}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-invalid="false"
        aria-describedby={errorId}
      />
      <div id={errorId} className="text-sm text-red-500 hidden" role="alert">
        {field.errorMessage}
      </div>
    </div>
  );
}

// This component will be rendered on the client
function FormFieldGroup({
  title,
  fields,
}: {
  title: string;
  fields: FormField[];
}) {
  const groupId = useId();

  return (
    <fieldset className="space-y-4">
      <legend id={groupId} className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </legend>
      <div className="space-y-4" role="group" aria-labelledby={groupId}>
        {fields.map((field) => (
          <DynamicFormField key={field.id} field={field} />
        ))}
      </div>
    </fieldset>
  );
}

export default function RealWorldExample() {
  const personalFields: FormField[] = [
    {
      id: "first-name",
      label: "First Name",
      type: "text",
      required: true,
      errorMessage: "Please enter your first name",
    },
    {
      id: "last-name",
      label: "Last Name",
      type: "text",
      required: true,
      errorMessage: "Please enter your last name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      required: true,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
      errorMessage: "Please enter a valid email address",
    },
  ];

  const accountFields: FormField[] = [
    {
      id: "username",
      label: "Username",
      type: "text",
      required: true,
      pattern: "[a-zA-Z0-9_]{3,}",
      errorMessage:
        "Username must be at least 3 characters and can only contain letters, numbers, and underscores",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      required: true,
      pattern: ".{8,}",
      errorMessage: "Password must be at least 8 characters",
    },
    {
      id: "confirm-password",
      label: "Confirm Password",
      type: "password",
      required: true,
      errorMessage: "Passwords must match",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">useId Real-World Example</h1>
      <p className="mb-4">
        This example demonstrates how useId can be used in a complex form with
        accessibility features and server-side rendering.
      </p>

      <form className="space-y-8 max-w-2xl">
        <FormFieldGroup title="Personal Information" fields={personalFields} />

        <FormFieldGroup title="Account Details" fields={accountFields} />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Account
        </button>
      </form>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">Key Features:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Each form field gets unique, stable IDs for both the input and error
            message
          </li>
          <li>Form groups use useId for accessibility with aria-labelledby</li>
          <li>
            Error messages are properly associated with inputs using
            aria-describedby
          </li>
          <li>Works seamlessly across server and client components</li>
          <li>Maintains accessibility even with dynamic form generation</li>
        </ul>
      </div>
    </div>
  );
}
