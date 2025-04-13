"use client";

import React, { useState, useMemo } from "react";
import Fuse, { IFuseOptions } from "fuse.js";
import { books, Book } from "@/lib/data";

// Fixed options for the simple example
const fuseOptions: IFuseOptions<Book> = {
  keys: [
    { name: "title", weight: 0.7 },
    { name: "author.firstName", weight: 0.3 },
    { name: "author.lastName", weight: 0.5 },
    { name: "tags", weight: 0.4 },
  ],
  includeScore: false, // Not displaying score in this simple version
  threshold: 0.4, // Default threshold
};

export default function FuseClientSimpleSearch() {
  const [query, setQuery] = useState("");

  // Memoize the Fuse instance (options are fixed, so deps are empty)
  const fuse = useMemo(() => new Fuse(books, fuseOptions), []);

  // Memoize the search results
  const results = useMemo(() => {
    if (!query) {
      return []; // Show nothing if query is empty
      // Or return books.map((book, index) => ({item: book, refIndex: index})) to show all
    }
    // Fuse returns results like { item: Book, refIndex: number, score?: number }
    return fuse.search(query);
  }, [query, fuse]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Fuse.js Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books (fuzzy)..."
        className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
      />
      <ul className="space-y-2">
        {results.length > 0
          ? results.map((result) => (
              // Access the book data via result.item
              <li
                key={result.refIndex}
                className="p-2 border rounded shadow-sm"
              >
                <h3 className="font-semibold">{result.item.title}</h3>
                <p className="text-sm text-gray-600">
                  {result.item.author.firstName} {result.item.author.lastName}
                </p>
                {result.item.tags && (
                  <p className="text-xs text-gray-500 mt-1">
                    Tags: {result.item.tags.join(", ")}
                  </p>
                )}
              </li>
            ))
          : // Show message only if user has typed something
            query && <p>No books found.</p>}
        {/* Optionally show all books when query is empty */}
        {!query &&
          books.map((book, index) => (
            <li
              key={`all-${index}`}
              className="p-2 border rounded shadow-sm opacity-50"
            >
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">
                {book.author.firstName} {book.author.lastName}
              </p>
              {book.tags && (
                <p className="text-xs text-gray-500 mt-1">
                  Tags: {book.tags.join(", ")}
                </p>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
