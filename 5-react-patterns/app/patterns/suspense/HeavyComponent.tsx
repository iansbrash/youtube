// Simulate a heavy library import
const heavyLibrary = Array.from({ length: 10000000 }, (_, i) => ({
  id: i,
  data: `Item ${i}`,
  value: Math.random() * 1000,
}));

// Simulate complex calculations
function complexCalculation() {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sin(i) * Math.cos(i);
  }
  return result;
}

export default function HeavyComponent() {
  // Force some heavy calculations
  const result = complexCalculation();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Heavy Component Loaded!
      </h2>
      <p className="text-gray-600 mb-4">
        This component simulates a heavy load by:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        <li>
          Loading a large dataset ({heavyLibrary.length.toLocaleString()} items)
        </li>
        <li>Performing complex calculations</li>
        <li>Rendering multiple elements</li>
      </ul>
      <div className="mt-4 p-4 bg-gray-50 rounded">
        <p className="text-sm text-gray-500">
          Calculation result: {result.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
