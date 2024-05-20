import clsx from "clsx";
import React from "react";

type ButtonProps = React.ComponentProps<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = "Button";

export default Button;
