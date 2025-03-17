import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef } from "react";

import { forwardRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  customProp: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ customProp, children, className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn("bg-teal-400 px-2 py-1", className)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
