"use client";

import { useState } from "react";
import { CounterUI } from "@/components/ui/counter-components";

export default function WithoutSyncHocExample() {
  // State management directly in the component
  const [count, setCount] = useState(5);

  // Helper functions defined directly in the component
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Without HOC Example</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <CounterUI
          count={count}
          onIncrement={increment}
          onDecrement={decrement}
          onSetValue={setCount}
        >
          <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
            <p className="text-yellow-800 font-medium mb-2">
              Without HOC Pattern Issues:
            </p>
            <ul className="list-disc ml-5 text-yellow-800">
              <li>State logic is mixed with UI rendering</li>
              <li>Cannot easily reuse the counter logic in other components</li>
              <li>
                Component has multiple responsibilities (state management +
                rendering)
              </li>
              <li>More difficult to test in isolation</li>
            </ul>
          </div>

          {/* Additional component that would need to duplicate counter logic */}
          <AnotherComponentNeedingCounter />
        </CounterUI>
      </div>
    </div>
  );
}

// This component would need to duplicate the counter logic if it also needs a counter
function AnotherComponentNeedingCounter() {
  // Duplicated state management
  const [count, setCount] = useState(0);

  return (
    <div className="mt-6 p-4 border border-dashed border-gray-300 rounded">
      <h3 className="font-medium mb-2">Another Component Needing Counter</h3>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 bg-gray-200 rounded">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="px-2 py-1 bg-gray-500 text-white text-sm rounded"
        >
          +
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Without HOC pattern, this component needs to duplicate the counter logic
      </p>
    </div>
  );
}
