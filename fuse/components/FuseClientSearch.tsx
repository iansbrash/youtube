"use client";

import React, { useState, useMemo } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import { books, Book } from "@/lib/data";

// Define which keys to search
const searchableKeys = [
  { name: "title", weight: 0.7 }, // Give title higher weight
  { name: "author.firstName", weight: 0.3 },
  { name: "author.lastName", weight: 0.5 }, // Higher weight for last name
  { name: "tags", weight: 0.4 }, // Search tags too
];

export default function FuseClientSearch() {
  const [query, setQuery] = useState("");
  const [threshold, setThreshold] = useState(0.4); // Initial threshold
  const [includeScore, setIncludeScore] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    searchableKeys.map((k) => k.name), // Start searching all keys
  );

  // Memoize the Fuse instance creation
  const fuse = useMemo(() => {
    const currentKeys = searchableKeys.filter((k) =>
      selectedKeys.includes(k.name),
    );
    const options: IFuseOptions<Book> = {
      keys: currentKeys,
      includeScore: includeScore,
      threshold: threshold,
      // Add other options here if needed
      // location: 0,
      // distance: 100,
      // minMatchCharLength: 1,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
    };
    return new Fuse(books, options);
  }, [threshold, includeScore, selectedKeys]); // Recreate Fuse instance if these change

  // Memoize the search results
  const results = useMemo(() => {
    if (!query) {
      // Optionally return all books or an empty array when query is empty
      return books.map((book, index) => ({
        item: book,
        refIndex: index,
        score: 0,
      }));
      // Or return [];
    }
    return fuse.search(query);
  }, [query, fuse]);

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedKeys((prev) =>
      checked ? [...prev, name] : prev.filter((key) => key !== name),
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fuse.js Client-Side Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books (fuzzy)..."
        className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
      />

      {/* Options Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 border rounded bg-gray-50">
        {/* Threshold Slider */}
        <div>
          <label
            htmlFor="threshold"
            className="block text-sm font-medium text-gray-700"
          >
            Threshold (0=strict, 1=loose): {threshold.toFixed(2)}
          </label>
          <input
            type="range"
            id="threshold"
            name="threshold"
            min="0"
            max="1"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Include Score Checkbox */}
        <div className="flex items-center">
          <input
            id="includeScore"
            name="includeScore"
            type="checkbox"
            checked={includeScore}
            onChange={(e) => setIncludeScore(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="includeScore"
            className="ml-2 block text-sm text-gray-900"
          >
            Include Score
          </label>
        </div>

        {/* Searchable Keys Checkboxes */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-1">
            Search in keys:
          </legend>
          <div className="space-y-1">
            {searchableKeys.map((key) => (
              <div key={key.name} className="flex items-center">
                <input
                  id={`key-${key.name}`}
                  name={key.name}
                  type="checkbox"
                  checked={selectedKeys.includes(key.name)}
                  onChange={handleKeyChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`key-${key.name}`}
                  className="ml-2 block text-xs text-gray-900"
                >
                  {key.name} (w: {key.weight})
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Results List */}
      <ul className="space-y-2">
        {results.length > 0 ? (
          results.map((result) => (
            <li
              key={result.refIndex}
              className="p-3 border rounded shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{result.item.title}</h3>
                {includeScore && result.score !== undefined && (
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
          ))
        ) : (
          <p className="text-gray-500">No matching books found.</p>
        )}
      </ul>
    </div>
  );
}
