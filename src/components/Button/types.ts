import { CSSProperties, MouseEvent } from "react";

export interface IButtonProps {
  size?: "small" | "medium" | "large";
  secondary?: boolean;
  loading: boolean;
  loadingProgress?: number;
  theme?: "dark" | "light";

  className?: string;
  disabled?: boolean;

  style?: CSSProperties;

  type?: "button" | "submit";

  children: React.ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
