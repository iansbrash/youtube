"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Simulated API calls
const fetchData = () => new Promise((resolve) => setTimeout(resolve, 2000));
const fetchDataWithError = () =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Failed to fetch")), 2000),
  );

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
              <div
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "1rem",
                }}
              >
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

      {/* Promise toast with custom component */}
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(fetchData(), {
            loading: (
              <div className="flex items-center gap-2">
                <span>⏳</span>
                <span>Loading your profile...</span>
              </div>
            ),
            success: (
              <div className="flex items-center gap-2">
                <span>👤</span>
                <span>Profile loaded successfully!</span>
              </div>
            ),
            error: (
              <div className="flex items-center gap-2">
                <span>❌</span>
                <span>Failed to load profile</span>
              </div>
            ),
          })
        }
      >
        Custom Component Promise Toast
      </Button>
    </div>
  );
}
