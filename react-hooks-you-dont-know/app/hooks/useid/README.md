# useId Hook

## What it does

`useId` is a React hook that generates a unique, stable ID that remains consistent across server and client renders. It's particularly useful in server-side rendered (SSR) applications to avoid hydration mismatches and ensure accessibility.

## Key Features

- Generates stable IDs across server and client renders
- Works in both client and server components
- Perfect for accessibility attributes
- No hydration mismatches
- Deterministic IDs

## Examples

### Toy Example: Basic Form Fields

Located in `page.tsx`, this example shows how useId works in both client and server components:

```tsx
// Client component
function ClientFormField({ label }: { label: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}

// Server component
async function ServerFormField({ label }: { label: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}
```

### Real-World Example: Dynamic Form Generator

Located in `real-world/page.tsx`, this example demonstrates a complex form with accessibility features:

```tsx
function DynamicFormField({ field }: { field: FormField }) {
  const id = useId();
  const errorId = useId();

  return (
    <div>
      <label htmlFor={id} aria-describedby={errorId}>
        {field.label}
      </label>
      <input id={id} aria-describedby={errorId} aria-invalid="false" />
      <div id={errorId} role="alert">
        {field.errorMessage}
      </div>
    </div>
  );
}
```

## Common Use Cases

1. Form input labels and error messages
2. ARIA attributes (aria-labelledby, aria-describedby)
3. Dynamic lists of form fields
4. Modal dialogs and their triggers
5. Complex form validation messages

## Anti-patterns to Avoid

### ❌ Using Random IDs

```tsx
// Don't use random IDs or timestamps
const id = Math.random().toString(); // ❌
const id = Date.now().toString(); // ❌
```

### ❌ Manual ID Generation

```tsx
// Don't manually generate IDs
const id = `field-${index}`; // ❌
```

### ❌ Using useId for Non-Accessibility Purposes

```tsx
// Don't use for non-accessibility purposes
const id = useId();
<div key={id}> // ❌ Use proper key props instead
```

## Best Practices

### ✅ Use for Accessibility Attributes

```tsx
function FormField() {
  const id = useId();
  return (
    <label htmlFor={id}>
      Label
      <input id={id} />
    </label>
  );
}
```

### ✅ Multiple IDs in One Component

```tsx
function ComplexField() {
  const inputId = useId();
  const errorId = useId();
  return (
    <div>
      <label htmlFor={inputId}>Label</label>
      <input id={inputId} aria-describedby={errorId} />
      <div id={errorId}>Error message</div>
    </div>
  );
}
```

### ✅ With Server Components

```tsx
async function ServerComponent() {
  const id = useId();
  return <div id={id}>Server rendered content</div>;
}
```

## When to Use

- When you need stable IDs across server and client renders
- For accessibility attributes (htmlFor, aria-\*)
- In server-side rendered applications
- When building reusable form components
- For complex form validation messages

## When Not to Use

- For React key props
- For non-accessibility purposes
- When you need predictable, readable IDs
- When you need to share IDs between components

## Performance Considerations

- `useId` is lightweight and optimized
- IDs are generated deterministically
- No impact on performance
- Safe to use in loops and dynamic content
