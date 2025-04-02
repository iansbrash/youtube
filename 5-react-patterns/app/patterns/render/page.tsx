"use client";

import { MouseTracker } from "./MouseTracker";
import { DataFetcher } from "./DataFetcher";

export default function RenderPropsPattern() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Render Props Pattern
      </h1>

      <div className="prose max-w-none mb-8">
        <p className="text-gray-600">
          The render props pattern allows you to share logic between components
          by passing a function as a prop that returns a React element. This
          pattern is great for decoupling logic from presentation.
        </p>
      </div>

      {/* Mouse Tracker Example */}
      <section className="space-y-4 mb-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Mouse Position Tracker
        </h2>
        <p className="text-gray-600">
          This example shows how to share mouse position data using render
          props.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Simple Display */}
          <MouseTracker>
            {({ x, y }) => (
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Simple Display
                </h3>
                <p className="text-gray-600">
                  Mouse position: ({x}, {y})
                </p>
              </div>
            )}
          </MouseTracker>

          {/* Visual Display */}
          <MouseTracker>
            {({ x, y }) => (
              <div className="relative h-full">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Visual Display
                </h3>
                <div
                  className="absolute w-4 h-4 bg-blue-500 rounded-full"
                  style={{
                    left: `${(x / window.innerWidth) * 100}%`,
                    top: `${(y / window.innerHeight) * 100}%`,
                  }}
                />
              </div>
            )}
          </MouseTracker>
        </div>
      </section>

      {/* Data Fetcher Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Data Fetcher</h2>
        <p className="text-gray-600">
          This example shows how to handle loading, error, and data states using
          render props.
        </p>

        <DataFetcher>
          {({ data, loading, error }) => {
            if (loading) {
              return (
                <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              );
            }

            if (error) {
              return (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-medium">Error: {error.message}</p>
                </div>
              );
            }

            return (
              <div className="space-y-4">
                {data?.map((post) => (
                  <div key={post.id} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-800">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-gray-600">{post.body}</p>
                  </div>
                ))}
              </div>
            );
          }}
        </DataFetcher>
      </section>
    </div>
  );
}
