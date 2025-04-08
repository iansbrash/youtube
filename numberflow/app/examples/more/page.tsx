"use client";

import NumberFlow from "@number-flow/react";
import { FC, useState } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [value, setValue] = useState(123);
  const [price, setPrice] = useState(99.99);
  const [percentage, setPercentage] = useState(0.15);

  const shuffle = () => {
    const randomValue = Math.floor(Math.random() * 1000);
    setValue(randomValue);
    setPrice(Math.random() * 1000);
    setPercentage(Math.random() * 0.3 - 0.15); // Random between -0.15 and 0.15
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
      {/* Basic Example */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Basic Number</h2>
        <NumberFlow className="text-4xl font-black" value={value} />
      </div>

      {/* Currency Example */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Currency</h2>
        <NumberFlow
          className="text-4xl font-black"
          value={price}
          format={{
            style: "currency",
            currency: "USD",
            trailingZeroDisplay: "stripIfInteger",
          }}
        />
      </div>

      {/* Percentage with Trend */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Stock Percentage</h2>
        <NumberFlow
          className={`text-4xl font-black ${
            percentage >= 0 ? "text-green-500" : "text-red-500"
          }`}
          value={percentage}
          format={{
            style: "percent",
            signDisplay: "always",
            maximumFractionDigits: 2,
          }}
          trend={percentage >= 0 ? 1 : -1}
        />
      </div>

      {/* Shuffle Button */}
      <button
        onClick={shuffle}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Shuffle All Numbers
      </button>
    </div>
  );
};

export default Page;
