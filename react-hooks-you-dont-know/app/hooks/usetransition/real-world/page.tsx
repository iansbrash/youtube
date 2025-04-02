"use client";

import { useState, useTransition } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

// Simulate expensive data processing
const processData = (
  data: User[],
  options: {
    search: string;
    sortBy: keyof User;
    sortOrder: "asc" | "desc";
    page: number;
    pageSize: number;
  },
): { users: User[]; total: number } => {
  // Artificial delay to simulate expensive operation
  const start = Date.now();
  while (Date.now() - start < 200) {
    // Block the main thread
  }

  let filtered = [...data];

  // Apply search filter
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower),
    );
  }

  // Apply sorting
  filtered.sort((a, b) => {
    const aValue = a[options.sortBy];
    const bValue = b[options.sortBy];
    const order = options.sortOrder === "asc" ? 1 : -1;
    return aValue > bValue ? order : -order;
  });

  // Apply pagination
  const startIndex = (options.page - 1) * options.pageSize;
  const paginated = filtered.slice(startIndex, startIndex + options.pageSize);

  return {
    users: paginated,
    total: filtered.length,
  };
};

// Generate sample data
const generateUsers = (): User[] => {
  const roles = ["Admin", "User", "Editor", "Viewer"];
  const statuses: ("active" | "inactive")[] = ["active", "inactive"];

  return Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
};

const sampleUsers = generateUsers();

export default function RealWorldExample() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [isPending, startTransition] = useTransition();

  const [processedData, setProcessedData] = useState(() =>
    processData(sampleUsers, { search, sortBy, sortOrder, page, pageSize }),
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1); // Reset to first page on search

    startTransition(() => {
      const result = processData(sampleUsers, {
        search: value,
        sortBy,
        sortOrder,
        page: 1,
        pageSize,
      });
      setProcessedData(result);
    });
  };

  const handleSort = (field: keyof User) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(field);
    setSortOrder(newOrder);

    startTransition(() => {
      const result = processData(sampleUsers, {
        search,
        sortBy: field,
        sortOrder: newOrder,
        page,
        pageSize,
      });
      setProcessedData(result);
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    startTransition(() => {
      const result = processData(sampleUsers, {
        search,
        sortBy,
        sortOrder,
        page: newPage,
        pageSize,
      });
      setProcessedData(result);
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        useTransition Real-World Example
      </h1>
      <p className="mb-4">
        This example demonstrates how useTransition can be used in a complex
        data table with sorting, filtering, and pagination to keep the UI
        responsive during expensive operations.
      </p>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search Users
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={handleSearchChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, email, or role..."
          />
        </div>

        {isPending && (
          <div className="text-sm text-gray-500 animate-pulse">
            Processing data...
          </div>
        )}

        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {processedData.users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, processedData.total)} of{" "}
            {processedData.total} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page * pageSize >= processedData.total}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">Key Features:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Immediate UI updates for user interactions</li>
          <li>Deferred data processing for expensive operations</li>
          <li>Loading state during transitions</li>
          <li>Complex data operations (sorting, filtering, pagination)</li>
          <li>Responsive UI during heavy computations</li>
        </ul>
      </div>
    </div>
  );
}
