"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ActionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Simple action toast */}
      <Button
        variant="outline"
        onClick={() =>
          toast("Action Toast", {
            action: {
              label: "Undo",
              onClick: (e) => {
                e.preventDefault();
                alert("Undo clicked");
              },
            },
          })
        }
      >
        Action Toast
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast("Cancel Toast", {
            cancel: {
              label: "Cancel",
              onClick: (e) => {
                console.log("Cancel clicked");
              },
            },
          })
        }
      >
        Cancel Toast
      </Button>

      {/* React component as action */}
      <Button
        variant="outline"
        onClick={() =>
          toast("Custom Action Component", {
            action: (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Primary action clicked");
                }}
              >
                Primary
              </Button>
            ),
          })
        }
      >
        Custom Action Component
      </Button>
    </div>
  );
}
