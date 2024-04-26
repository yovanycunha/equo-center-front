import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface ISelectProps {
  theme: "dark" | "light";
  icon?: ReactNode;
  onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;

  disabled?: boolean;
  placeholder?: string;
  error?: FieldError | string;
  hasCountries?: boolean;
  children: JSX.Element[];
  label?: string;
  value: string | number;
  errorMessage?: string;
  placeholderFilter?: string;
  darkTheme?: boolean;
  errors?: boolean;
  arrow?: boolean;
  hasFilter?: boolean;
  borderless?: boolean;
  biggerOptions?: boolean;
  borderBottomOnly?: boolean;
  className?: string;
  hideSearch?: boolean;
  topOrientation?: boolean;

  onBlur?(): void;
  onFocus?(): void;

  onChange: (value: string) => void;
  onChangeFilterValue?: (value: string) => void;
}
