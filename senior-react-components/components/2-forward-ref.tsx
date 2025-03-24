import {
  ComponentPropsWithoutRef,
  ComponentProps,
  forwardRef,
  ComponentRef,
} from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  customProp: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ customProp, children, ...props }, ref) => {
    return (
      <button {...props} ref={ref}>
        {children}
      </button>
    );
  },
);

// We need to manually add the displayName if we use forwardRef
Button.displayName = "Button";

const Button2 = forwardRef<ComponentRef<typeof Button>, ButtonProps>(
  ({ customProp, children, ...props }, ref) => {
    return (
      <Button {...props} ref={ref} customProp={customProp}>
        {children}
      </Button>
    );
  },
);

Button2.displayName = "Button2";
