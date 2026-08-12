import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      className
    ].filter(Boolean).join(" ");

    return (
      <button
        ref={ref}
        className={classNames}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
