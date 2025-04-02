# useTransition Hook

## What it does

`useTransition` is a React hook that lets you mark state updates as non-urgent. It returns a tuple with a boolean indicating if a transition is pending and a function to start a transition. This helps keep the UI responsive during expensive operations by deferring non-critical updates.

## Key Features

- Marks state updates as non-urgent
- Provides pending state for loading indicators
- Helps maintain UI responsiveness
- Perfect for expensive operations
- Works with any state update

## Examples

### Toy Example: Search with Transitions

Located in `page.tsx`, this example shows how useTransition can keep a search input responsive:

```tsx
function SearchComponent() {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      const nextItems = slowFilter(items, value);
      setFilteredItems(nextItems);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Updating...</span>}
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Real-World Example: Data Table

Located in `real-world/page.tsx`, this example demonstrates a complex data table with transitions:

```tsx
function DataTable() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    startTransition(() => {
      const result = processData(sampleData, {
        search: value,
        sortBy,
        // ... other options
      });
      setProcessedData(result);
    });
  };

  return (
    <div>
      <input value={search} onChange={handleSearchChange} />
      {isPending && <LoadingIndicator />}
      <Table data={processedData} />
    </div>
  );
}
```

## Common Use Cases

1. Search inputs with expensive filtering
2. Data tables with sorting and filtering
3. Complex data processing
4. Large list rendering
5. Real-time data updates

## Anti-patterns to Avoid

### ❌ Using for Critical Updates

```tsx
// Don't use for updates that need to be immediate
startTransition(() => {
  setCriticalValue(newValue); // ❌
});
```

### ❌ Nesting Transitions

```tsx
// Don't nest transitions
startTransition(() => {
  startTransition(() => {
    // ❌
    setValue(newValue);
  });
});
```

### ❌ Using with Synchronous Operations

```tsx
// Don't use for simple operations
startTransition(() => {
  setSimpleValue(newValue); // ❌
});
```

## Best Practices

### ✅ Use for Expensive Operations

```tsx
function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  const handleSearch = (newQuery) => {
    startTransition(() => {
      const filtered = expensiveSearch(newQuery);
      setResults(filtered);
    });
  };

  return (
    <div>
      {isPending && <LoadingIndicator />}
      <ResultsList results={results} />
    </div>
  );
}
```

### ✅ Show Loading State

```tsx
function Component() {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = () => {
    startTransition(() => {
      // Expensive operation
    });
  };

  return (
    <div>
      {isPending && <LoadingIndicator />}
      <ExpensiveComponent />
    </div>
  );
}
```

### ✅ Combine with Memoization

```tsx
function ExpensiveComponent({ data }) {
  const [isPending, startTransition] = useTransition();
  const [processedData, setProcessedData] = useState(data);

  const memoizedResult = useMemo(
    () => expensiveComputation(processedData),
    [processedData],
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

- `useTransition` is lightweight
- Updates happen during idle time
- Can improve perceived performance
- May cause slight visual lag
- Best for non-critical updates
