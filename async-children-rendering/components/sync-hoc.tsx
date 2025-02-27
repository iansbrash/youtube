"use client";

import { ReactNode, useState } from "react";

interface WithCounterProps {
  initialCount?: number;
  children: (props: {
    count: number;
    setCount: (value: number) => void;
    increment: () => void;
    decrement: () => void;
  }) => ReactNode;
}

/**
 * A synchronous Higher Order Component that manages counter state
 * and passes state management functions to its children.
 */
export function WithCounter({ initialCount = 0, children }: WithCounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // Pass state and state management functions to the children function
  return children({
    count,
    setCount,
    increment,
    decrement,
  });
}

/**
 * Example usage:
 *
 * <WithCounter>
 *   {({ count, increment, decrement }) => (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={increment}>Increment</button>
 *       <button onClick={decrement}>Decrement</button>
 *     </div>
 *   )}
 * </WithCounter>
 */
