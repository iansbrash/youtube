import { useEffect } from "react";

interface UseBeforeUnloadProps {
  shouldPreventUnload: boolean;
}

export function useBeforeUnload({ shouldPreventUnload }: UseBeforeUnloadProps) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldPreventUnload) {
        // Modern browsers
        e.preventDefault();
        // Required for legacy browser support
        return (e.returnValue = "");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldPreventUnload]);
}
