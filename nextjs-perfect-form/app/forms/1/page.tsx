import { Form1 } from "@/components/examples/form-1";
export default async function FormPage() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-8 text-2xl font-bold">
        react-hook-form + zod + server actions
      </h1>
      <Form1 />
    </div>
  );
}
