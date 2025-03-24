interface BadComponentProps {
  className?: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  ref?: React.RefObject<HTMLButtonElement>;
}

const styles = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-500 text-white",
};

export const BadButton = (props: BadComponentProps) => {
  const {
    className,
    variant = "primary",
    onClick,
    children,
    disabled,
    ref,
  } = props;

  return (
    <button
      className={
        "w-full" +
        " " +
        styles[variant] +
        " " +
        className +
        (disabled ? "opacity-50 cursor-not-allowed" : "")
      }
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  );
};
