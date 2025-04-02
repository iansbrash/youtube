"use client";

import { useState, useDeferredValue } from "react";

// Simulate a slow filtering operation
const slowFilter = (items: string[], query: string) => {
  // Artificial delay to simulate expensive operation
  const start = Date.now();
  while (Date.now() - start < 100) {
    // Block the main thread
  }
  return items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );
};

// Generate a large list of items
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

export default function UseDeferredValueDemo() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = slowFilter(items, deferredQuery);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">useDeferredValue Toy Example</h1>
      <p className="mb-4">
        This example demonstrates how useDeferredValue can keep the UI
        responsive during expensive operations.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search Items
          </label>
          <input
            id="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type to search..."
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Searching for: {deferredQuery}</span>
          {query !== deferredQuery && (
            <span className="animate-pulse">(updating...)</span>
          )}
        </div>

        <div className="h-96 overflow-auto border rounded p-4">
          <ul className="space-y-1">
            {filteredItems.map((item) => (
              <li key={item} className="py-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">What's happening?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>The search input updates immediately (using query)</li>
          <li>The filtered list updates with a delay (using deferredQuery)</li>
          <li>The UI remains responsive while filtering</li>
          <li>
            We show a loading indicator when the deferred value is different
            from the current value
          </li>
        </ul>
      </div>
    </div>
  );
}
