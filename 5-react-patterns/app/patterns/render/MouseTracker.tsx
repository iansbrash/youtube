import { useState, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  children: (pos: Position) => React.ReactNode;
  className?: string;
}

export function MouseTracker({ children, className = "" }: MouseTrackerProps) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`h-40 bg-gray-100 rounded-lg p-4 ${className}`}>
      {children(position)}
    </div>
  );
}
