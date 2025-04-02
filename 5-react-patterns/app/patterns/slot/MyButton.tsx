import { Slot } from "@radix-ui/react-slot";

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

export function MyButton({
  asChild,
  variant = "primary",
  className = "",
  ...props
}: MyButtonProps) {
  const Comp = asChild ? Slot : "button";

  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    outline:
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500",
  };

  return (
    <Comp
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  );
}
