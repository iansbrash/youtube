"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function BasicPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Basic toast button */}
      <Button
        onClick={() => {
          toast("Hello, world!");
        }}
      >
        Show Basic Toast
      </Button>
    </div>
  );
}
