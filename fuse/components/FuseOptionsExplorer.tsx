"use client";

import React, { useState, useMemo, Fragment } from "react";
import Fuse, { IFuseOptions, FuseResultMatch } from "fuse.js";
import { books, Book } from "@/lib/data";

// Define which keys to search, allowing weights
const initialSearchableKeys: Array<{ name: string; weight: number }> = [
  { name: "title", weight: 0.6 },
  { name: "author.firstName", weight: 0.2 },
  { name: "author.lastName", weight: 0.4 },
  { name: "tags", weight: 0.3 },
];

// Helper function to highlight matches
function highlightMatches(
  text: string,
  matches: readonly FuseResultMatch[] | undefined,
  key: string,
): React.ReactNode {
  if (!matches || !text) {
    return text;
  }

  const relevantMatches = matches.filter((m) => m.key === key);
  if (!relevantMatches.length) {
    return text;
  }

  // Flatten indices and sort them
  let indices: Array<[number, number]> = [];
  relevantMatches.forEach((match) => {
    if (match.indices) {
      // Filter out invalid indices just in case
      indices = indices.concat(
        match.indices.filter((idx) => idx && idx.length === 2) as Array<
          [number, number]
        >,
      );
    }
  });

  if (indices.length === 0) {
    // Check if any valid indices were found
    return text;
  }

  indices = indices.sort((a, b) => a[0] - b[0]);

  // Merge overlapping or adjacent indices
  const mergedIndices: Array<[number, number]> = [];
  // Ensure indices[0] exists before accessing it
  let current: [number, number] = [...indices[0]]; // Explicitly type 'current' and create a mutable copy
  for (let i = 1; i < indices.length; i++) {
    const next = indices[i];
    if (next[0] <= current[1] + 1) {
      // Overlapping or adjacent
      current[1] = Math.max(current[1], next[1]);
    } else {
      mergedIndices.push(current);
      current = [...next]; // Start a new interval
    }
  }
  mergedIndices.push(current); // Add the last interval

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  mergedIndices.forEach(([start, end], i) => {
    // Add text before the highlight
    if (start > lastIndex) {
      result.push(
        <Fragment key={`text-${i}`}>
          {text.substring(lastIndex, start)}
        </Fragment>,
      );
    }
    // Add highlighted text
    result.push(
      <strong key={`match-${i}`} className="bg-yellow-200 px-0.5 rounded">
        {text.substring(start, end + 1)}
      </strong>,
    );
    lastIndex = end + 1;
  });

  // Add any remaining text after the last highlight
  if (lastIndex < text.length) {
    result.push(
      <Fragment key="text-end">{text.substring(lastIndex)}</Fragment>,
    );
  }

  return result;
}

export default function FuseOptionsExplorer() {
  // --- State Variables ---
  const [query, setQuery] = useState("jhon"); // Default query to show something initially

  // Fuse Options State
  const [threshold, setThreshold] = useState(0.4);
  const [location, setLocation] = useState(0);
  const [distance, setDistance] = useState(100);
  const [minMatchCharLength, setMinMatchCharLength] = useState(1);
  const [includeScore, setIncludeScore] = useState(true);
  const [includeMatches, setIncludeMatches] = useState(true);
  const [findAllMatches, setFindAllMatches] = useState(false);
  const [ignoreLocation, setIgnoreLocation] = useState(false);
  const [useExtendedSearch, setUseExtendedSearch] = useState(false);
  const [keys, setKeys] = useState(initialSearchableKeys);

  // --- Memoized Fuse Instance & Results ---
  const fuseOptions = useMemo<IFuseOptions<Book>>(
    () => ({
      keys: keys,
      threshold,
      location,
      distance,
      minMatchCharLength,
      includeScore,
      includeMatches,
      findAllMatches,
      ignoreLocation,
      useExtendedSearch,
      // fieldNormWeight: 1, // Example of another option
    }),
    [
      keys,
      threshold,
      location,
      distance,
      minMatchCharLength,
      includeScore,
      includeMatches,
      findAllMatches,
      ignoreLocation,
      useExtendedSearch,
    ],
  );

  const fuse = useMemo(() => new Fuse(books, fuseOptions), [fuseOptions]);

  const results = useMemo(() => {
    if (!query && !useExtendedSearch) return []; // Don't search empty string unless extended search
    if (useExtendedSearch && query.trim() === "") return [];
    return fuse.search(query);
  }, [query, fuse, useExtendedSearch]);

  // --- Event Handlers ---
  const handleKeyWeightChange = (keyName: string, weight: number) => {
    setKeys((currentKeys) =>
      currentKeys.map((k) =>
        k.name === keyName ? { ...k, weight: weight } : k,
      ),
    );
  };

  const handleKeyActiveChange = (keyName: string, checked: boolean) => {
    if (checked) {
      // Add key back (find its original weight or use a default)
      const originalKey = initialSearchableKeys.find(
        (k) => k.name === keyName,
      ) || { name: keyName, weight: 0.5 };
      // Try to insert it back in a reasonable order, or just append
      const currentKeyNames = keys.map((k) => k.name);
      const initialIndex = initialSearchableKeys.findIndex(
        (k) => k.name === keyName,
      );
      let insertPos = keys.length; // Default to end

      for (let i = initialIndex - 1; i >= 0; i--) {
        const prevKeyName = initialSearchableKeys[i].name;
        const currentIdx = currentKeyNames.indexOf(prevKeyName);
        if (currentIdx !== -1) {
          insertPos = currentIdx + 1;
          break;
        }
      }
      const newKeys = [...keys];
      newKeys.splice(insertPos, 0, originalKey);
      setKeys(newKeys);
    } else {
      // Remove key
      setKeys((currentKeys) => currentKeys.filter((k) => k.name !== keyName));
    }
  };

  // --- Rendering ---
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Column 1: Options */}
      <div className="md:col-span-1 space-y-4">
        <h2 className="text-xl font-semibold mb-3">Fuse.js Options</h2>

        {/* Basic Options */}
        <div className="p-3 border rounded bg-gray-50">
          <label
            htmlFor="threshold"
            className="block text-sm font-medium text-gray-700"
          >
            Threshold: {threshold.toFixed(2)}
          </label>
          <input
            type="range"
            id="threshold"
            min="0"
            max="1"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="p-3 border rounded bg-gray-50">
          <div className="flex items-center mb-2">
            <input
              id="ignoreLocation"
              type="checkbox"
              checked={ignoreLocation}
              onChange={(e) => setIgnoreLocation(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="ignoreLocation"
              className="ml-2 block text-sm font-medium text-gray-900"
            >
              Ignore Location
            </label>
          </div>
          {!ignoreLocation && (
            <>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location: {location}
              </label>
              <input
                type="range"
                id="location"
                min="0"
                max={100}
                step="1"
                value={location}
                onChange={(e) => setLocation(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-2"
              />

              <label
                htmlFor="distance"
                className="block text-sm font-medium text-gray-700"
              >
                Distance: {distance}
              </label>
              <input
                type="range"
                id="distance"
                min="0"
                max={1000}
                step="10"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </>
          )}
        </div>

        <div className="p-3 border rounded bg-gray-50">
          <label
            htmlFor="minMatchCharLength"
            className="block text-sm font-medium text-gray-700"
          >
            Min Match Char Length: {minMatchCharLength}
          </label>
          <input
            type="range"
            id="minMatchCharLength"
            min="1"
            max={10}
            step="1"
            value={minMatchCharLength}
            onChange={(e) => setMinMatchCharLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Include Options */}
        <div className="p-3 border rounded bg-gray-50 space-y-2">
          <div className="flex items-center">
            <input
              id="includeScore"
              type="checkbox"
              checked={includeScore}
              onChange={(e) => setIncludeScore(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="includeScore"
              className="ml-2 block text-sm font-medium text-gray-900"
            >
              Include Score
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="includeMatches"
              type="checkbox"
              checked={includeMatches}
              onChange={(e) => setIncludeMatches(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="includeMatches"
              className="ml-2 block text-sm font-medium text-gray-900"
            >
              Include Matches (Highlight)
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="findAllMatches"
              type="checkbox"
              checked={findAllMatches}
              onChange={(e) => setFindAllMatches(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="findAllMatches"
              className="ml-2 block text-sm font-medium text-gray-900"
            >
              Find All Matches
            </label>
          </div>
        </div>

        {/* Extended Search */}
        <div className="p-3 border rounded bg-gray-50">
          <div className="flex items-center">
            <input
              id="useExtendedSearch"
              type="checkbox"
              checked={useExtendedSearch}
              onChange={(e) => setUseExtendedSearch(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="useExtendedSearch"
              className="ml-2 block text-sm font-medium text-gray-900"
            >
              Use Extended Search
            </label>
          </div>
          {useExtendedSearch && (
            <p className="text-xs text-gray-500 mt-1">
              Allows patterns like `'Book` (prefix), `Book$` (suffix), `!term`
              (negation), `=term` (exact).
            </p>
          )}
        </div>

        {/* Keys Configuration */}
        <div className="p-3 border rounded bg-gray-50">
          <h3 className="text-md font-medium mb-2">Search Keys & Weights</h3>
          <div className="space-y-2">
            {initialSearchableKeys.map((initialKey) => {
              const currentKey = keys.find((k) => k.name === initialKey.name);
              const isActive = !!currentKey;
              const weight = currentKey?.weight ?? initialKey.weight;

              return (
                <div
                  key={initialKey.name}
                  className="flex items-center space-x-2"
                >
                  <input
                    id={`key-active-${initialKey.name}`}
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) =>
                      handleKeyActiveChange(initialKey.name, e.target.checked)
                    }
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`key-active-${initialKey.name}`}
                    className="text-sm flex-grow"
                  >
                    {initialKey.name}
                  </label>
                  {isActive && (
                    <>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={weight}
                        onChange={(e) =>
                          handleKeyWeightChange(
                            initialKey.name,
                            parseFloat(e.target.value),
                          )
                        }
                        className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        title={`Weight: ${weight.toFixed(1)}`}
                      />
                      <span className="text-xs font-mono w-6 text-right">
                        {weight.toFixed(1)}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Options Display (Optional) */}
        {/* <div className="p-3 border rounded bg-gray-800 text-gray-200 text-xs overflow-x-auto">
            <h3 className="text-sm font-medium mb-1 text-gray-400">Current Options:</h3>
            <pre><code>{JSON.stringify(fuseOptions, (key, value) => key === 'keys' ? value.map(k => k.name ? `${k.name} (w:${k.weight})` : k) : value , 2)}</code></pre>
         </div> */}
      </div>

      {/* Column 2 & 3: Search Input and Results */}
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Fuse.js Options Explorer</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            useExtendedSearch
              ? "Enter query or pattern..."
              : "Search books (fuzzy)..."
          }
          className="w-full p-2 border border-gray-300 rounded mb-6 text-black"
        />

        {/* Results List */}
        <h2 className="text-xl font-semibold mb-3">
          Results ({results.length})
        </h2>
        <ul className="space-y-3">
          {results.length > 0 ? (
            results.map((result) => (
              <li
                key={result.refIndex}
                className="p-3 border rounded shadow-sm bg-white relative"
              >
                {includeScore && result.score !== undefined && (
                  <span className="absolute top-2 right-2 text-xs font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    Score: {result.score.toFixed(4)}
                  </span>
                )}
                <h3 className="font-semibold text-lg mb-1 pr-20">
                  {" "}
                  {/* Padding right for score */}
                  {includeMatches
                    ? highlightMatches(
                        result.item.title,
                        result.matches,
                        "title",
                      )
                    : result.item.title}
                </h3>
                <p className="text-sm text-gray-700">
                  Author:{" "}
                  {includeMatches
                    ? highlightMatches(
                        result.item.author.firstName,
                        result.matches,
                        "author.firstName",
                      )
                    : result.item.author.firstName}{" "}
                  {includeMatches
                    ? highlightMatches(
                        result.item.author.lastName,
                        result.matches,
                        "author.lastName",
                      )
                    : result.item.author.lastName}
                </p>
                {result.item.tags && result.item.tags.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    Tags:{" "}
                    {includeMatches
                      ? highlightMatches(
                          result.item.tags.join(", "),
                          result.matches,
                          "tags",
                        )
                      : result.item.tags.join(", ")}
                  </p>
                )}

                {/* Detailed Matches Output */}
                {includeMatches &&
                  result.matches &&
                  result.matches.length > 0 && (
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                        Show Match Details
                      </summary>
                      <pre className="mt-1 p-2 bg-gray-50 rounded overflow-x-auto text-gray-600">
                        <code>{JSON.stringify(result.matches, null, 2)}</code>
                      </pre>
                    </details>
                  )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">
              {query
                ? "No matching books found with current options."
                : "Enter a query to start searching."}
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
