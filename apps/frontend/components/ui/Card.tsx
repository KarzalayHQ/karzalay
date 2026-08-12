import React from "react";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  shadow?: boolean;
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padded = true, shadow = true, hoverable = false, className = "", children, ...props }, ref) => {
    const classNames = [
      styles.card,
      padded && styles.padded,
      shadow && styles.shadow,
      hoverable && styles.hoverable,
      className
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
