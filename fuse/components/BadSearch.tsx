"use client";

import React, { useState, useMemo } from "react";
import { books } from "@/lib/data"; // Adjust path if needed

export default function BadSearch() {
  const [query, setQuery] = useState("");

  const filteredBooks = useMemo(() => {
    if (!query) {
      return books; // Show all books if query is empty
    }

    const lowerCaseQuery = query.toLowerCase();

    const cleanQuery = (text: string) => {
      return text.replace(/[.,'"\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    };

    return books.filter((book) => {
      const titleMatch = cleanQuery(book.title)
        .toLowerCase()
        .includes(lowerCaseQuery);

      const authorFirstNameMatch = book.author.firstName
        .toLowerCase()
        .includes(lowerCaseQuery);

      const authorLastNameMatch = book.author.lastName
        .toLowerCase()
        .includes(lowerCaseQuery);

      // Very basic check - any match includes the book
      // Optionally: remove punctuation, implement some keyword matching
      // This could also be done on the server (i.e. with Prisma)
      // * await prisma.book.findMany({ where: { firstName: { includes: { query } },... } })
      return titleMatch || authorFirstNameMatch || authorLastNameMatch;
    });
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manual Search (Bad Example)</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books by title or author..."
        className="w-full p-2 border border-gray-300 rounded mb-4 text-black" // Added text-black for visibility
      />
      <ul className="space-y-2">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <li key={index} className="p-2 border rounded shadow-sm">
              <h3 className="font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">
                {book.author.firstName} {book.author.lastName}
              </p>
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
    </div>
  );
}
