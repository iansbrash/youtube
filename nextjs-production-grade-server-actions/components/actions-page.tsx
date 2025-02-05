"use client";

import { useState } from "react";
import { exampleBetterAction } from "@/examples/1+2/better-action";
import { useAction, useOptimisticAction } from "next-safe-action/hooks";
import { exampleBadAction } from "@/examples/1+2/bad-action";
import { User } from "@prisma/client";

export default function ActionsPage({ user }: { user: User }) {
  const [name, setName] = useState("");

  const exampleBetter = useAction(exampleBetterAction, {
    onSuccess: (result) => {
      // do something...
    },
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
      <pre className="p-4 rounded">
        Name: {exampleBetterOptimistic.optimisticState.name}
      </pre>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border p-2 rounded text-black"
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
      <div className="space-x-4 mb-4">
        <button
          onClick={() => exampleBetterOptimistic.execute({ name })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Better Action (Optimistic)
        </button>
      </div>

      {exampleBetter.hasErrored && (
        <div className="text-red-500 mb-4">
          Error: {exampleBetter.result.serverError || "Error"}
        </div>
      )}

      {exampleBetter.result && (
        <pre className=" p-4 rounded">
          Basic Result: {JSON.stringify(exampleBetter.result, null, 2)}
        </pre>
      )}

      {exampleBetterOptimistic.result && (
        <pre className=" p-4 rounded">
          Optimistic Result:{" "}
          {JSON.stringify(exampleBetterOptimistic.result, null, 2)}
        </pre>
      )}
    </div>
  );
}
