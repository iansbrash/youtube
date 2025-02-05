"use client";

import { useAction } from "next-safe-action/hooks";
import { onActionError } from "@/actions/safe-action-helpers";
import { exampleErroringAction } from "@/examples/3/erroring-action";
import { toast } from "sonner";

export default function ErrorsPage() {
  const errorAction = useAction(exampleErroringAction, {
    onError: onActionError,
    // onError: ({ error }) => {
    //   console.error("error:", error.serverError);
    //   console.error("validation errors:", error.validationErrors);

    //   toast.error(error.serverError);
    // },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Error Handling Examples</h1>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold mb-2">Test Error Toast</h2>
          <button
            onClick={() => errorAction.execute()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Show Error Toast
          </button>
        </div>
      </div>
    </div>
  );
}
