"use client";

import { RefDemo } from "./RefDemo";

export default function RefPattern() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Useful Ref Functions
      </h1>

      <div className="prose max-w-none mb-8">
        <p className="text-gray-600">
          Refs provide a way to interact with DOM elements directly. Here are
          some useful ref functions beyond the common .focus() and .blur():
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>
            <code>.select()</code> - Highlights text in an input
          </li>
          <li>
            <code>.setSelectionRange()</code> - Sets text selection range in
            input/textarea
          </li>
          <li>
            <code>.play() / .pause()</code> - Controls video/audio elements
          </li>
          <li>
            <code>.getBoundingClientRect()</code> - Measures position/size for
            layout work
          </li>
          <li>
            <code>.classList.add() / .remove() / .toggle()</code> - Add/remove
            classes dynamically
          </li>
        </ul>
      </div>

      <RefDemo />
    </div>
  );
}
