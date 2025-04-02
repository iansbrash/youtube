// Add artificial delay to demonstrate loading state
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function LazyComponent() {
  // Wait for 2 seconds to simulate slow loading
  await delay(2000);

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-bold text-blue-800">Lazy Loaded Component</h2>
      <p className="mt-2 text-blue-600">
        This component was loaded only when needed, reducing the initial bundle
        size!
      </p>
    </div>
  );
}
