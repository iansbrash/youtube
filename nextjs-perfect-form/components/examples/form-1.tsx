"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { nameSchema } from "@/actions/schema";
import { updateName } from "@/actions/forms/form-1";
import { z } from "zod";

type NameSchema = z.infer<typeof nameSchema>;

export function Form1() {
  const form = useForm<NameSchema>({
    resolver: zodResolver(nameSchema),
  });

  const onSubmit: SubmitHandler<NameSchema> = async (values) => {
    await updateName(values);

    alert(`Name updated to ${values.name}`);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...form.register("name")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
}
