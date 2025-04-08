"use client";

import NumberFlow from "@number-flow/react";
import { FC, useState } from "react";

interface PageProps {}

const Page: FC<PageProps> = () => {
  const [value, setValue] = useState(123);

  const shuffle = () => {
    const randomValue = Math.floor(Math.random() * 1000);
    setValue(randomValue);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <NumberFlow className="text-4xl font-black" value={value} />
        <button
          onClick={shuffle}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default Page;
