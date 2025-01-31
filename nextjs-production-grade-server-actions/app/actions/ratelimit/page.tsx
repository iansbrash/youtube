"use client";

import { useState } from "react";
import { User } from "@prisma/client";

interface RateLimitPageProps {
  user: User;
}

export default function RateLimitPage({ user }: RateLimitPageProps) {
  const [name, setName] = useState("");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Rate Limit Example</h1>

      <pre className="bg-gray-100 p-4 rounded">Current user: {user.name}</pre>

      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="border p-2 rounded"
        />
      </div>

      <div className="space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Update Name
        </button>
      </div>
    </div>
  );
}
