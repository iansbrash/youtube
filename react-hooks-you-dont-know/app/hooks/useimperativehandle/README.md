# useImperativeHandle Hook

## What it does

`useImperativeHandle` is a React hook that lets you customize the instance value that is exposed when using `ref` on a component. It's used in combination with `forwardRef` to expose specific methods or values to parent components while hiding internal implementation details.

## Key Concepts

- Works with `forwardRef` to expose custom methods
- Provides controlled access to child component functionality
- Hides internal implementation details
- Creates a clean API for parent components

## Examples

### Toy Example: Custom Input Component

Located in `page.tsx`, this example shows a simple input component that exposes focus and reset methods:

```tsx
interface CustomInputHandle {
  focus: () => void;
  reset: () => void;
}

const CustomInput = forwardRef<CustomInputHandle>((_, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    reset: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} />;
});
```

### Real-World Example: Form Field Component

Located in `real-world/page.tsx`, this example demonstrates a form field component with validation:

```tsx
interface FormFieldHandle {
  validate: () => boolean;
  reset: () => void;
  focus: () => void;
}

const FormField = forwardRef<FormFieldHandle, FormFieldProps>(
  ({ label, type, required, pattern, errorMessage }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      validate: () => {
        // Validation logic
      },
      reset: () => {
        // Reset logic
      },
      focus: () => inputRef.current?.focus()
    }));

    return (
      // Component JSX
    );
  }
);
```

## Common Use Cases

1. Form field components with validation
2. Custom input components with specific methods
3. Modal/dialog components with open/close methods
4. Canvas components with drawing methods
5. Custom scroll containers with scroll methods

## Anti-patterns to Avoid

### ❌ Exposing Everything

```tsx
// Don't expose the entire internal ref
useImperativeHandle(ref, () => inputRef.current); // ❌
```

### ❌ Missing forwardRef

```tsx
// Don't forget to wrap with forwardRef
const MyComponent = (props, ref) => { // ❌
  useImperativeHandle(ref, ...);
};
```

### ❌ Exposing Internal State

```tsx
// Don't expose internal state directly
useImperativeHandle(ref, () => ({
  internalState: someState, // ❌
  setInternalState: setSomeState, // ❌
}));
```

## Best Practices

### ✅ Define Clear Interface

```tsx
interface ComponentHandle {
  // Only expose necessary methods
  doSomething: () => void;
  reset: () => void;
}
```

### ✅ Use with forwardRef

```tsx
const MyComponent = forwardRef<ComponentHandle, Props>((props, ref) => {
  useImperativeHandle(ref, () => ({
    // Methods
  }));
});
```

### ✅ Keep API Minimal

```tsx
// Only expose what's needed
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  reset: () => (inputRef.current?.value = ""),
}));
```

## When to Use

- When you need to expose specific methods to parent components
- When you want to hide internal implementation details
- When building reusable components with controlled APIs
- When creating form field components with validation

## When Not to Use

- When you can use props and callbacks instead
- When you need to expose the entire component instance
- When the component doesn't need imperative methods
- When you're just passing refs to DOM elements

## Performance Considerations

- `useImperativeHandle` is lightweight
- The handle object is recreated on each render
- Consider memoizing the handle if it's expensive to create
- Use sparingly - prefer props and callbacks when possible
