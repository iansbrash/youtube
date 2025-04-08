"use client";

import NumberFlow from "@number-flow/react";
import { FC, useState } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [value, setValue] = useState(1234.56);

  const shuffle = () => {
    const randomValue = Math.floor(Math.random() * 10000) / 100;
    setValue(randomValue);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">All NumberFlow Props</h2>
        <NumberFlow
          // The numeric value to display
          value={value}
          // * Formatting options using Intl.NumberFormat
          format={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            notation: "standard",
            signDisplay: "auto",
            useGrouping: true,
          }}
          // Locale for number formatting
          locales="en-US"
          // Custom prefix/suffix
          prefix="~"
          suffix="/mo"
          // Animation timing options
          transformTiming={{
            duration: 750,
            easing: "ease-out",
          }}
          spinTiming={{
            duration: 750,
            easing: "ease-out",
          }}
          opacityTiming={{
            duration: 350,
            easing: "ease-out",
          }}
          // Controls animation direction
          // 1: always up, -1: always down, 0: natural direction
          trend={1}
          // Isolates transitions from layout changes
          isolate={true}
          // Enables/disables animations
          animated={true}
          // Configures digit ranges (useful for time displays)
          digits={{
            0: { max: 9 }, // First digit
            1: { max: 9 }, // Second digit
            2: { max: 9 }, // Third digit
          }}
          // Respects user's reduced motion preference
          respectMotionPreference={true}
          // Applies will-change properties for better performance
          willChange={true}
          // * Event handlers
          onAnimationsStart={(e) => console.log("Animation started", e)}
          onAnimationsFinish={(e) => console.log("Animation finished", e)}
          // * Styling
          className="text-4xl font-black"
        />
      </div>

      <button
        onClick={shuffle}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Shuffle Number
      </button>
    </div>
  );
};

export default Page;
