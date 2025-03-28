"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Simulated API calls
const fetchData = () => new Promise((resolve) => setTimeout(resolve, 2000));
const fetchDataWithError = () =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Failed to fetch")), 2000),
  );

// Random outcome function
const randomOutcome = (data: string) =>
  new Promise<string>((resolve, reject) => {
    // 50% chance of success/error
    if (Math.random() > 0.5) {
      setTimeout(() => resolve(`Success with: ${data}`), 2000);
    } else {
      setTimeout(() => reject(new Error("Random error occurred")), 2000);
    }
  });

export default function PromisePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Basic promise toast */}
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(fetchData(), {
            loading: "Loading your data...",
            success: "Data loaded successfully!",
            error: "Failed to load data",
          })
        }
      >
        Basic Promise Toast
      </Button>

      {/* Promise toast with custom styling */}
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(fetchData(), {
            loading: "Processing...",
            success: () => (
              <div className="text-white px-2 rounded bg-emerald-600">
                Success! Your data has been loaded
              </div>
            ),
            error: () => (
              <div
                style={{
                  background: "#ef4444",
                  color: "white",
                  padding: "1rem",
                }}
              >
                Error: Something went wrong
              </div>
            ),
          })
        }
      >
        Styled Promise Toast
      </Button>

      {/* Promise toast with error handling */}
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(fetchDataWithError(), {
            loading: "Attempting to fetch data...",
            success: "Data fetched successfully!",
            error: (err) => `Error: ${err.message}`,
          })
        }
      >
        Error Promise Toast
      </Button>

      {/* Random outcome promise toast */}
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(randomOutcome("test-data"), {
            description: "Processing: test-data",
            loading: "Processing: test-data",
            success: (data: string) => (
              <div className="flex items-center gap-2 text-white px-2 rounded bg-emerald-600">
                <span>✨</span>
                <span>{data}</span>
              </div>
            ),
            error: (error: Error) => (
              <div className="flex items-center gap-2 text-white px-2 rounded bg-red-600">
                <span>❌</span>
                <span>{error.message}</span>
              </div>
            ),
          })
        }
      >
        Random Outcome Toast
      </Button>
    </div>
  );
}
