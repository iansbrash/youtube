"use client";

import { useState, useDeferredValue } from "react";

interface DataPoint {
  timestamp: number;
  value: number;
}

// Simulate expensive data processing
const processData = (data: DataPoint[], range: string): DataPoint[] => {
  // Artificial delay to simulate expensive operation
  const start = Date.now();
  while (Date.now() - start < 200) {
    // Block the main thread
  }

  const now = Date.now();
  const ranges = {
    "1h": 60 * 60 * 1000,
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  };

  return data.filter(
    (point) => point.timestamp > now - ranges[range as keyof typeof ranges],
  );
};

// Generate sample data
const generateData = (): DataPoint[] => {
  const now = Date.now();
  return Array.from({ length: 1000 }, (_, i) => ({
    timestamp: now - i * 1000 * 60, // One point per minute
    value: Math.random() * 100,
  }));
};

const sampleData = generateData();

export default function RealWorldExample() {
  const [timeRange, setTimeRange] = useState("24h");
  const deferredTimeRange = useDeferredValue(timeRange);

  const processedData = processData(sampleData, deferredTimeRange);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        useDeferredValue Real-World Example
      </h1>
      <p className="mb-4">
        This example demonstrates how useDeferredValue can be used in a data
        visualization dashboard to keep the UI responsive during expensive data
        processing.
      </p>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">
            Time Range:
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          {timeRange !== deferredTimeRange && (
            <span className="text-sm text-gray-500 animate-pulse">
              Processing data...
            </span>
          )}
        </div>

        <div className="border rounded-lg p-4 bg-white">
          <div className="h-64 flex items-end justify-between gap-1">
            {processedData.slice(0, 50).map((point, i) => (
              <div
                key={point.timestamp}
                className="bg-blue-500 w-1"
                style={{
                  height: `${(point.value / 100) * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Data Points</h3>
            <p className="text-2xl font-bold text-blue-500">
              {processedData.length}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Average Value</h3>
            <p className="text-2xl font-bold text-green-500">
              {(
                processedData.reduce((acc, point) => acc + point.value, 0) /
                processedData.length
              ).toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="font-semibold mb-2">Key Features:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>The time range selector updates immediately</li>
          <li>Data processing and visualization updates are deferred</li>
          <li>The UI remains responsive during expensive data operations</li>
          <li>Loading state is shown when processing is in progress</li>
          <li>Perfect for data-heavy dashboards and visualizations</li>
        </ul>
      </div>
    </div>
  );
}
