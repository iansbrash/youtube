import { Suspense } from "react";
import { Posts } from "./Posts";
import { DynamicHeavyComponent } from "./DynamicHeavyComponent";

export default function SuspensePattern() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      {/* Server-side Suspense */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Server-side Suspense
        </h1>

        <div className="prose max-w-none mb-8">
          <p className="text-gray-600">
            This example demonstrates Suspense with server components and data
            fetching in the App Router. The Posts component is a server
            component that fetches data, and Suspense handles the loading state.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-100 rounded-lg animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          }
        >
          <Posts />
        </Suspense>
      </section>

      {/* Client-side Dynamic Import */}
      <DynamicHeavyComponent />
    </div>
  );
}
