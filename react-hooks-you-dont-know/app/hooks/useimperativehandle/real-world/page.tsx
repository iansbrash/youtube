"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface FormFieldHandle {
  validate: () => boolean;
  reset: () => void;
  focus: () => void;
}

interface FormFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
}

const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  ({ label, type = "text", required = false, pattern, errorMessage }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const validate = () => {
      if (!inputRef.current) return false;

      const value = inputRef.current.value;
      let isValid = true;

      if (required && !value) {
        setError("This field is required");
        isValid = false;
      } else if (pattern && !new RegExp(pattern).test(value)) {
        setError(errorMessage || "Invalid format");
        isValid = false;
      } else {
        setError(null);
      }

      return isValid;
    };

    useImperativeHandle(ref, () => ({
      validate,
      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
          setError(null);
        }
      },
      focus: () => inputRef.current?.focus(),
    }));

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          className={`border p-2 rounded w-full ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          required={required}
          pattern={pattern}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

FormField.displayName = "FormField";

export default function RealWorldExample() {
  const emailRef = useRef<FormFieldHandle>(null);
  const passwordRef = useRef<FormFieldHandle>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = emailRef.current?.validate() ?? false;
    const isPasswordValid = passwordRef.current?.validate() ?? false;

    if (isEmailValid && isPasswordValid) {
      // Handle form submission
      console.log("Form is valid!");
    }
  };

  const handleReset = () => {
    emailRef.current?.reset();
    passwordRef.current?.reset();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        useImperativeHandle Real-World Example
      </h1>
      <p className="mb-4">
        This example shows how useImperativeHandle can be used to create a form
        field component with validation and reset capabilities.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <FormField
          ref={emailRef}
          label="Email"
          type="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          errorMessage="Please enter a valid email address"
        />

        <FormField
          ref={passwordRef}
          label="Password"
          type="password"
          required
          pattern=".{8,}"
          errorMessage="Password must be at least 8 characters"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">Key Points:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            The FormField component exposes validate(), reset(), and focus()
            methods
          </li>
          <li>
            Parent components can control validation and reset without knowing
            internal implementation
          </li>
          <li>
            The component maintains its own error state while exposing a clean
            API
          </li>
          <li>
            This pattern is perfect for reusable form components in design
            systems
          </li>
        </ul>
      </div>
    </div>
  );
}
