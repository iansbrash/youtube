import { Suspense, lazy } from "react";
import { Posts } from "./Posts";

// Lazy load the component
const LazyComponent = lazy(() => import("./LazyComponent"));

export default async function SuspensePattern() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        React Suspense Patterns
      </h1>

      {/* Client-side Suspense */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          1. Client-side Lazy Loading
        </h2>
        <p className="text-gray-600">
          This component is loaded only when needed, reducing the initial bundle
          size.
        </p>
        <Suspense
          fallback={
            <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          }
        >
          <LazyComponent />
        </Suspense>
      </section>

      {/* Server-side Suspense */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          2. Server Component with Data Fetching
        </h2>
        <p className="text-gray-600">
          This section demonstrates Suspense with server components and data
          fetching.
        </p>
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
    </div>
  );
}
