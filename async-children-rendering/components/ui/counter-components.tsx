"use client";

import { ReactNode } from "react";

// Component to display the counter value
export function CounterDisplay({ count }: { count: number }) {
  return (
    <div className="text-center p-6 bg-gray-800 rounded-md border border-gray-700">
      <span className="text-5xl font-bold text-white">{count}</span>
    </div>
  );
}

// Component for increment/decrement buttons
export function CounterButtons({
  onIncrement,
  onDecrement,
}: {
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={onDecrement}
        className="px-5 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition shadow-md font-medium"
      >
        Decrement
      </button>

      <button
        onClick={onIncrement}
        className="px-5 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition shadow-md font-medium"
      >
        Increment
      </button>
    </div>
  );
}

// Component for preset value buttons
export function CounterPresets({
  onSetValue,
}: {
  onSetValue: (value: number) => void;
}) {
  const presetValues = [0, 10, 25, 50, 100];

  return (
    <div className="mt-5">
      <p className="mb-3 text-sm text-gray-300">Set to specific value:</p>
      <div className="flex gap-2">
        {presetValues.map((value) => (
          <button
            key={value}
            onClick={() => onSetValue(value)}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}

// Wrapper component for counter UI
export function CounterUI({
  count,
  onIncrement,
  onDecrement,
  onSetValue,
  children,
}: {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetValue: (value: number) => void;
  children?: ReactNode;
}) {
  return (
    <div className="space-y-5 bg-gray-900 shadow-xl rounded-lg p-6 border border-gray-800">
      <CounterDisplay count={count} />
      <CounterButtons onIncrement={onIncrement} onDecrement={onDecrement} />
      <CounterPresets onSetValue={onSetValue} />
      {children}
    </div>
  );
}
