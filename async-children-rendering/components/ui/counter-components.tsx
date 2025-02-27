"use client";

import { ReactNode } from "react";

// Component to display the counter value
export function CounterDisplay({ count }: { count: number }) {
  return (
    <div className="text-center p-4 bg-gray-100 rounded-md">
      <span className="text-4xl font-bold">{count}</span>
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
    <div className="flex justify-center gap-3">
      <button
        onClick={onDecrement}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Decrement
      </button>

      <button
        onClick={onIncrement}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
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
    <div className="mt-4">
      <p className="mb-2 text-sm text-gray-600">Set to specific value:</p>
      <div className="flex gap-2">
        {presetValues.map((value) => (
          <button
            key={value}
            onClick={() => onSetValue(value)}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
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
    <div className="space-y-4">
      <CounterDisplay count={count} />
      <CounterButtons onIncrement={onIncrement} onDecrement={onDecrement} />
      <CounterPresets onSetValue={onSetValue} />
      {children}
    </div>
  );
}
