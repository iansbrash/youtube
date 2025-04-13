"use server";

import Fuse, { IFuseOptions, FuseResult } from "fuse.js";
import { books, Book } from "@/lib/data";

// Define the server action
export async function searchBooksAction(
  formData: FormData,
): Promise<FuseResult<Book>[]> {
  const query = formData.get("query") as string;

  if (!query) {
    return []; // Return empty if no query
  }

  // Basic Fuse options for the server action
  // Could be made more dynamic if needed
  const options: IFuseOptions<Book> = {
    keys: ["title", "author.firstName", "author.lastName", "tags"],
    includeScore: true,
    threshold: 0.4, // Default threshold for server action
  };

  const fuse = new Fuse(books, options);
  const results = fuse.search(query);

  // Simulate network delay (optional, for testing loading states)
  // await new Promise(resolve => setTimeout(resolve, 500));

  return results;
}
