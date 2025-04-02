"use client";

import dynamic from "next/dynamic";

// Dynamic import with no SSR
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  ssr: false,
  loading: () => (
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
  ),
});

export function DynamicHeavyComponent() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Client-side Dynamic Import
      </h2>
      <p className="text-gray-600 mb-4">
        In the App Router, we use Next.js's dynamic import instead of
        React.lazy. This component is loaded only on the client side (ssr:
        false).
      </p>

      <div className="p-6 bg-gray-50 rounded-lg">
        <HeavyComponent />
      </div>
    </section>
  );
}
