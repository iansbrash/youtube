# useLayoutEffect Hook

## What it does

`useLayoutEffect` is a React hook that's similar to `useEffect`, but it fires synchronously after all DOM mutations but before the browser paints. This makes it perfect for measuring DOM elements or applying visual changes that need to happen before the user sees anything.

## Key Differences from useEffect

- Runs synchronously after DOM mutations
- Blocks browser paint until completion
- Perfect for DOM measurements and visual updates
- Can impact performance if overused

## Examples

### Toy Example: Measuring Element Width

Located in `page.tsx`, this example demonstrates how to measure a DOM element's width before paint:

```tsx
const [width, setWidth] = useState(0);
const ref = useRef<HTMLDivElement>(null);

useLayoutEffect(() => {
  if (ref.current) {
    const rect = ref.current.getBoundingClientRect();
    setWidth(rect.width);
  }
}, []);
```

### Real-World Example: Tooltip Positioning

Located in `real-world/page.tsx`, this example shows how to position tooltips without flickering:

```tsx
useLayoutEffect(() => {
  if (isVisible && triggerRef.current && tooltipRef.current) {
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    tooltipRef.current.style.top = `${triggerRect.bottom + 5}px`;
    tooltipRef.current.style.left = `${triggerRect.left + (triggerRect.width - tooltipRect.width) / 2}px`;
  }
}, [isVisible]);
```

## Common Use Cases

1. Measuring DOM elements before paint
2. Positioning tooltips, modals, or dropdowns
3. Synchronizing scroll positions
4. Preventing layout flicker
5. Applying visual changes that need to happen before paint

## Anti-patterns to Avoid

### ❌ Using for Non-Visual Updates

```tsx
// Don't use for data fetching or non-visual updates
useLayoutEffect(() => {
  fetchData(); // ❌ Use useEffect instead
}, []);
```

### ❌ Heavy Computations

```tsx
// Don't do expensive calculations that block paint
useLayoutEffect(() => {
  heavyComputation(); // ❌ This will block the UI
}, []);
```

### ❌ Missing Dependencies

```tsx
// Don't forget dependencies that affect layout
useLayoutEffect(() => {
  updatePosition(); // ❌ Missing dependencies can cause stale measurements
}, []); // Should include relevant props/state
```

## Best Practices

### ✅ Use for Visual Measurements

```tsx
useLayoutEffect(() => {
  if (elementRef.current) {
    const height = elementRef.current.offsetHeight;
    setHeight(height); // ✅ Good: Visual measurement before paint
  }
}, []);
```

### ✅ Handle SSR Properly

```tsx
// Use isomorphic layout effect for SSR compatibility
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
```

### ✅ Clean Up Properly

```tsx
useLayoutEffect(() => {
  // Setup
  return () => {
    // Cleanup
    cleanup();
  };
}, []);
```

## When to Use

- When you need to measure DOM elements
- When visual consistency matters on first paint
- When you need to apply visual changes before paint
- When you need to prevent layout flicker

## When Not to Use

- For data fetching
- For non-visual side effects
- When the timing of updates isn't critical
- When performance is a concern and the update isn't visual

## Performance Considerations

- `useLayoutEffect` blocks paint, so keep it lightweight
- Use `useEffect` when possible
- Only use `useLayoutEffect` when visual consistency is critical
- Consider using `requestAnimationFrame` for complex animations
