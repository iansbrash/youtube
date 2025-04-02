"use client";

import dynamic from "next/dynamic";

// Lazy load the heavy component
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const LazyComponent = () => {
  return <HeavyComponent />;
};

export default LazyComponent;
