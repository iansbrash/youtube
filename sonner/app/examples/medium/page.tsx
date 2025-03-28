"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell } from "lucide-react";

export default function MediumPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Different toast types */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast.info("This is an info toast", {
              description: "This is a description!",
            })
          }
        >
          Info Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("Operation successful!")}
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("Please be careful!")}
        >
          Warning Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Something went wrong!")}
        >
          Error Toast
        </Button>
      </div>

      {/* JSX in toast */}
      <Button
        variant="outline"
        onClick={() =>
          toast(
            <div className="flex items-center gap-2">
              <a
                href="https://www.youtube.com/@iansbrash"
                className="bg-amber-300 px-1 rounded"
                target="_blank"
                rel="noreferrer"
              >
                Custom JSX Toast!
              </a>
            </div>,
            {
              description: (
                <>
                  You can also use <span className="font-bold">JSX</span> in{" "}
                  <span className="font-bold">descriptions</span>
                </>
              ),
            },
          )
        }
      >
        JSX Toast
      </Button>

      {/* Custom icons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() =>
            toast("Notification", {
              icon: <Bell className="w-4 h-4 fill-current" />,
            })
          }
        >
          Lucide Icon Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Custom Icon", {
              icon: <MyIcon />,
            })
          }
        >
          Custom SVG Icon Toast
        </Button>
      </div>
    </div>
  );
}

function MyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
      <path
        fillRule="evenodd"
        d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
