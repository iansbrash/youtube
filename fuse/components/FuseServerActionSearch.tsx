"use client"; // This is now purely a client component

import React, { useState, useTransition } from "react";
import type { FuseResult } from "fuse.js"; // Import type
import type { Book } from "@/lib/data"; // Import type
import { searchBooksAction } from "@/lib/actions/searchActions"; // Import the server action

export default function FuseServerActionSearch() {
  const [results, setResults] = useState<FuseResult<Book>[]>([]);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition(); // For loading state

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(async () => {
      const searchResults = await searchBooksAction(formData); // Call the imported server action
      setResults(searchResults);
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    // Optional: Trigger search immediately on input change (debounced usually best)
    // For simplicity here, we rely on form submission
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fuse.js Server Action Search</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="query" // Important: Name matches formData key in action
          value={query}
          onChange={handleInputChange}
          placeholder="Search books (fuzzy)..."
          className="w-full p-2 border border-gray-300 rounded text-black"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !query}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Results List */}
      {isPending && <p>Loading results...</p>}
      {!isPending && query && results.length === 0 && (
        <p className="text-gray-500">No matching books found.</p>
      )}
      {!isPending && results.length > 0 && (
        <ul className="space-y-2">
          {results.map((result) => (
            <li
              key={result.refIndex}
              className="p-3 border rounded shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{result.item.title}</h3>
                {result.score !== undefined && (
                  <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    Score: {result.score.toFixed(4)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">
                {result.item.author.firstName} {result.item.author.lastName}
              </p>
              {result.item.tags && (
                <p className="text-xs text-gray-500 mt-1">
                  Tags: {result.item.tags.join(", ")}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
