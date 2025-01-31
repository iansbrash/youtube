"use client";

import { useState } from "react";
import { exampleBetterAction } from "@/examples/1+2/better-action";
import { useAction, useOptimisticAction } from "next-safe-action/hooks";
import { exampleBadAction } from "@/examples/1+2/bad-action";
import { User } from "@prisma/client";

export default function ActionsPage({ user }: { user: User }) {
  const [name, setName] = useState("");

  const exampleBetter = useAction(exampleBetterAction, {
    onSuccess: () => {},
  });

  const exampleBetterOptimistic = useOptimisticAction(exampleBetterAction, {
    currentState: user,
    updateFn: (state, input) => {
      return {
        ...state,
        name: input.name,
      };
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Actions Example</h1>
      <pre className="bg-gray-100 p-4 rounded">
        Name: {exampleBetterOptimistic.optimisticState.name}
      </pre>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border p-2 rounded"
        />
      </div>

      <div className="space-x-4 mb-4">
        <button
          onClick={() => exampleBadAction({ name })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Bad Action
        </button>
      </div>

      <div className="space-x-4 mb-4">
        <button
          onClick={() => exampleBetter.execute({ name })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Better Action
        </button>
      </div>

      {exampleBetter.hasErrored && (
        <div className="text-red-500 mb-4">
          Error: {exampleBetter.result.serverError || "Error"}
        </div>
      )}

      {exampleBetter.result && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(exampleBetter.result, null, 2)}
        </pre>
      )}
    </div>
  );
}
