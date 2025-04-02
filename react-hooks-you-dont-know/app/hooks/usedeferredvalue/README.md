# useDeferredValue Hook

## What it does

`useDeferredValue` is a React hook that lets you defer updating a value until the browser has finished more urgent work. It returns a "laggy" version of the input value that React updates during idle time, helping to keep the UI responsive during expensive operations.

## Key Features

- Defers value updates to keep UI responsive
- Works with any value type
- Automatically handles batching and scheduling
- Perfect for expensive computations or renders
- Built-in support for loading states

## Examples

### Toy Example: Search with Deferred Results

Located in `page.tsx`, this example shows how useDeferredValue can keep a search input responsive:

```tsx
function SearchComponent() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = slowFilter(items, deferredQuery);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {query !== deferredQuery && <span>Updating...</span>}
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Real-World Example: Data Visualization Dashboard

Located in `real-world/page.tsx`, this example demonstrates a data dashboard with deferred updates:

```tsx
function Dashboard() {
  const [timeRange, setTimeRange] = useState("24h");
  const deferredTimeRange = useDeferredValue(timeRange);

  const processedData = processData(sampleData, deferredTimeRange);

  return (
    <div>
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
      />
      {timeRange !== deferredTimeRange && <span>Processing data...</span>}
      <DataVisualization data={processedData} />
    </div>
  );
}
```

## Common Use Cases

1. Search inputs with expensive filtering
2. Data visualization dashboards
3. Large list rendering
4. Complex data processing
5. Real-time data updates

## Anti-patterns to Avoid

### ❌ Using for Critical Updates

```tsx
// Don't use for updates that need to be immediate
const deferredValue = useDeferredValue(criticalValue); // ❌
```

### ❌ Deferring User Input

```tsx
// Don't defer the actual input value
const deferredInput = useDeferredValue(inputValue); // ❌
```

### ❌ Using with Synchronous Operations

```tsx
// Don't use for simple operations
const deferredValue = useDeferredValue(simpleValue); // ❌
```

## Best Practices

### ✅ Use for Expensive Operations

```tsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const results = expensiveSearch(deferredQuery);
  return <ResultsList results={results} />;
}
```

### ✅ Show Loading State

```tsx
function Component() {
  const [value, setValue] = useState("");
  const deferredValue = useDeferredValue(value);

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      {value !== deferredValue && <LoadingIndicator />}
      <ExpensiveComponent value={deferredValue} />
    </div>
  );
}
```

### ✅ Combine with Memoization

```tsx
function ExpensiveComponent({ value }) {
  const deferredValue = useDeferredValue(value);
  const memoizedResult = useMemo(
    () => expensiveComputation(deferredValue),
    [deferredValue],
  );
  return <div>{memoizedResult}</div>;
}
```

## When to Use

- When you have expensive computations or renders
- When you need to keep the UI responsive
- For non-critical updates that can be deferred
- When processing large datasets
- For real-time data visualization

## When Not to Use

- For critical user interactions
- When updates need to be immediate
- For simple operations
- When the timing of updates is important
- For form validation or error states

## Performance Considerations

- `useDeferredValue` is lightweight
- Updates happen during idle time
- Can improve perceived performance
- May cause slight visual lag
- Best for non-critical updates
