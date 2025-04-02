interface WrapperProps {
  component: React.ComponentType<{ message: string }>;
  title?: string;
}

export function Wrapper({
  component: Component,
  title = "Default Title",
}: WrapperProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">
        <Component message="Hello from Wrapper!" />
        <Component message="This is another instance!" />
      </div>
    </div>
  );
}
