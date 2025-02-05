"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { rateLimitExampleAction } from "@/examples/4/rate-limit-action";
import { analyticsExampleAction } from "@/examples/4/analytics-action";
import { observabilityExampleAction } from "@/examples/4/observability-action";
import { combinedMiddlewareExampleAction } from "@/examples/4/combined-action";
import { authMiddlewareExampleAction } from "@/examples/4/auth-action";
import { onActionError } from "@/actions/safe-action-helpers";

interface RateLimitPageProps {
  user: User;
}

export default function MiddlewarePage({ user }: RateLimitPageProps) {
  const [name, setName] = useState("");

  // Set up all action hooks
  const { execute: executeAnalytics, status: analyticsStatus } = useAction(
    analyticsExampleAction,
  );
  const { execute: executeAuth, status: authStatus } = useAction(
    authMiddlewareExampleAction,
  );
  const { execute: executeCombined, status: combinedStatus } = useAction(
    combinedMiddlewareExampleAction,
  );
  const { execute: executeObservability, status: observabilityStatus } =
    useAction(observabilityExampleAction);

  const { execute: executeRateLimit, status: rateLimitStatus } = useAction(
    rateLimitExampleAction,
    {
      onError: onActionError,
    },
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Middleware Examples</h1>

      <pre className="p-4 rounded mb-8">Current user: {user.name}</pre>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border p-2 rounded w-full text-black"
        />
      </div>

      <div className="space-y-4">
        {/* Analytics Example */}
        <div>
          <h2 className="font-semibold mb-2">Analytics Middleware</h2>
          <button
            onClick={() => executeAnalytics({ name })}
            disabled={analyticsStatus === "executing"}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {analyticsStatus === "executing" ? "Running..." : "Test Analytics"}
          </button>
        </div>

        {/* Auth Example */}
        <div>
          <h2 className="font-semibold mb-2">Auth Middleware</h2>
          <button
            onClick={() => executeAuth({ name })}
            disabled={authStatus === "executing"}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {authStatus === "executing" ? "Running..." : "Test Auth"}
          </button>
        </div>

        {/* Combined Example */}
        <div>
          <h2 className="font-semibold mb-2">Combined Middleware</h2>
          <button
            onClick={() => executeCombined({ name })}
            disabled={combinedStatus === "executing"}
            className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {combinedStatus === "executing" ? "Running..." : "Test Combined"}
          </button>
        </div>

        {/* Observability Example */}
        <div>
          <h2 className="font-semibold mb-2">Observability Middleware</h2>
          <button
            onClick={() =>
              executeObservability({ someInput: "test", otherInput: 1 })
            }
            disabled={observabilityStatus === "executing"}
            className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {observabilityStatus === "executing"
              ? "Running..."
              : "Test Observability"}
          </button>
        </div>

        {/* Rate Limit Example */}
        <div>
          <h2 className="font-semibold mb-2">Rate Limit Middleware</h2>
          <button
            onClick={() => executeRateLimit({ name })}
            disabled={rateLimitStatus === "executing"}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {rateLimitStatus === "executing" ? "Running..." : "Test Rate Limit"}
          </button>
        </div>
      </div>
    </div>
  );
}
