"use client";

import { WithCounter } from "@/components/sync-hoc";
import { CounterUI } from "@/components/ui/counter-components";

export default function WithSyncHocExample() {
  return (
    <div className="p-8 max-w-md mx-auto bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Synchronous HOC Example
      </h1>

      <WithCounter initialCount={5}>
        {({ count, increment, decrement, setCount }) => (
          <CounterUI
            count={count}
            onIncrement={increment}
            onDecrement={decrement}
            onSetValue={setCount}
          >
            <div className="mt-4 p-3 bg-blue-900/30 rounded text-sm border border-blue-800">
              <p className="text-blue-300 font-medium mb-2">
                With HOC Pattern Benefits:
              </p>
              <ul className="list-disc ml-5 text-blue-300">
                <li>State logic is abstracted in the HOC</li>
                <li>Clean separation between state management and UI</li>
                <li>State logic can be reused across components</li>
                <li>Component only focuses on rendering UI</li>
                <li>Easier to test in isolation</li>
              </ul>
            </div>
          </CounterUI>
        )}
      </WithCounter>
    </div>
  );
}
