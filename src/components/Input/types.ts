import { RefAttributes, SyntheticEvent } from "react";

export interface IInputProps {
  type?: "text" | "password" | "email" | "number";
  name: string;
  placeholder: string;
  inputref: RefAttributes<HTMLInputElement>["ref"];
  value: string | undefined | number;
  errors?: boolean | undefined;
  errorMessage?: string | undefined;
  className?: string;
  disabled?: boolean;

  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
}
