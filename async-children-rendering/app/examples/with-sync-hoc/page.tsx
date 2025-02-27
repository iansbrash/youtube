"use client";

import { WithCounter } from "@/components/sync-hoc";
import { CounterUI } from "@/components/ui/counter-components";

export default function WithSyncHocExample() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Synchronous HOC Example</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <WithCounter initialCount={5}>
          {({ count, increment, decrement, setCount }) => (
            <CounterUI
              count={count}
              onIncrement={increment}
              onDecrement={decrement}
              onSetValue={setCount}
            >
              <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
                <p className="text-blue-800 font-medium mb-2">
                  With HOC Pattern Benefits:
                </p>
                <ul className="list-disc ml-5 text-blue-800">
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
    </div>
  );
}
