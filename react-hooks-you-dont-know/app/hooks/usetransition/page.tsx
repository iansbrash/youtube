"use client";

import { useState, useTransition } from "react";

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

export default function UseTransitionDemo() {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Mark the filtering operation as non-urgent
    startTransition(() => {
      const nextItems = slowFilter(items, value);
      setFilteredItems(nextItems);
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">useTransition Toy Example</h1>
      <p className="mb-4">
        This example demonstrates how useTransition can mark state updates as
        non-urgent, keeping the UI responsive during expensive operations.
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
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type to search..."
          />
        </div>

        {isPending && (
          <div className="text-sm text-gray-500 animate-pulse">
            Updating results...
          </div>
        )}

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
          <li>The search input updates immediately (urgent update)</li>
          <li>The filtered list updates with a delay (non-urgent update)</li>
          <li>We show a loading indicator during the transition</li>
          <li>The UI remains responsive while filtering</li>
        </ul>
      </div>
    </div>
  );
}
