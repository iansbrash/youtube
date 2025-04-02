import { Suspense, lazy, useState } from "react";
import "../../../app/globals.css";

// Lazy load the heavy component
const HeavyComponent = lazy(() => {
  console.log("Starting to load heavy component...");
  return import("../../../app/patterns/suspense/HeavyComponent");
});

export default function ClientSuspense() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Client-side Suspense
      </h1>

      <div className="space-y-4">
        <p className="text-gray-600">
          This example demonstrates client-side lazy loading with Suspense. The
          component is intentionally heavy to show the loading state.
        </p>

        <button
          onClick={() => setShowHeavy(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Load Heavy Component
        </button>

        {showHeavy && (
          <Suspense
            fallback={
              <div className="p-6 bg-white rounded-lg shadow-lg animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            }
          >
            <HeavyComponent />
          </Suspense>
        )}
      </div>
    </div>
  );
}
