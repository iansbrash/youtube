import { ComponentPropsWithoutRef, ComponentProps } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  customProp: string;
}

const Button = ({ customProp, children, ...props }: ButtonProps) => {
  return <button {...props}>{children}</button>;
};

// Example of extending from our custom Button component
interface SpecialButtonProps extends ComponentProps<typeof Button> {
  specialProp: boolean;
}

const SpecialButton = ({ specialProp, ...props }: SpecialButtonProps) => {
  return (
    <Button {...props}>
      {specialProp ? "✨ " : ""}
      {props.children}
    </Button>
  );
};

export { Button, SpecialButton, type ButtonProps, type SpecialButtonProps };
