"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function UseLayoutEffectDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">useLayoutEffect Toy Example</h1>
      <p className="mb-4">
        This example demonstrates how useLayoutEffect can measure DOM elements
        before paint.
      </p>

      <div className="space-y-4">
        <div
          ref={ref}
          className="bg-blue-200 p-4 rounded-lg transition-all duration-300"
          style={{ width: "50%" }}
        >
          Resize me
        </div>
        <p className="text-gray-700">Width: {width}px</p>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">What's happening?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            useLayoutEffect measures the box width before the browser paints
          </li>
          <li>
            This prevents any layout flicker that would occur with useEffect
          </li>
          <li>The measurement happens synchronously after DOM mutations</li>
        </ul>
      </div>
    </div>
  );
}
