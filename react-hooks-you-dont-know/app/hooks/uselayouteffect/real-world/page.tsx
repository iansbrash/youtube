"use client";

import { useLayoutEffect, useRef, useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Position tooltip below the trigger
      tooltipRef.current.style.top = `${triggerRect.bottom + 5}px`;
      tooltipRef.current.style.left = `${triggerRect.left + (triggerRect.width - tooltipRect.width) / 2}px`;
    }
  }, [isVisible]);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg"
          style={{ transform: "translateY(0)" }}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default function RealWorldExample() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        useLayoutEffect Real-World Example
      </h1>
      <p className="mb-4">
        This example shows how useLayoutEffect can be used to position tooltips
        without flickering.
      </p>

      <div className="space-y-8">
        <div className="flex gap-4">
          <Tooltip content="This is a tooltip">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Hover me
            </button>
          </Tooltip>

          <Tooltip content="Another tooltip example">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Hover me too
            </button>
          </Tooltip>
        </div>

        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">Key Points:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              useLayoutEffect positions the tooltip before the browser paints
            </li>
            <li>This prevents any visible positioning jumps or flickering</li>
            <li>
              The tooltip position updates immediately when the trigger element
              moves
            </li>
            <li>Perfect for UI elements that need precise positioning</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
