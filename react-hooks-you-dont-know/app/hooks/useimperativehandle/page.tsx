"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

interface CustomInputHandle {
  focus: () => void;
  reset: () => void;
  randomFunction: () => void;
}

const CustomInput = forwardRef<CustomInputHandle>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    reset: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
    randomFunction: () => {
      console.log("Random function called");
    },
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type something..."
    />
  );
});

CustomInput.displayName = "CustomInput";

export default function UseImperativeHandleDemo() {
  const inputRef = useRef<CustomInputHandle>(null);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        useImperativeHandle Toy Example
      </h1>
      <p className="mb-4">
        This example demonstrates how useImperativeHandle can expose specific
        methods to parent components while hiding internal implementation
        details.
      </p>

      <div className="space-y-4">
        <CustomInput ref={inputRef} />

        <div className="flex gap-2">
          <button
            onClick={() => inputRef.current?.focus()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Focus Input
          </button>
          <button
            onClick={() => inputRef.current?.reset()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset Input
          </button>
          <button
            onClick={() => inputRef.current?.randomFunction()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Random Function
          </button>
          {/* <button
            onClick={() => inputRef.current?.scrollIntoView()}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            This Won&apos;t Work!
          </button> */}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">What's happening?</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            The CustomInput component uses forwardRef and useImperativeHandle
          </li>
          <li>It exposes only focus() and reset() methods to the parent</li>
          <li>The parent can't access the internal input element directly</li>
          <li>
            This provides a clean, controlled API for the parent component
          </li>
        </ul>
      </div>
    </div>
  );
}
