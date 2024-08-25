import { RefAttributes, SyntheticEvent } from "react";

export interface IInputProps {
  type?: "text" | "password" | "email" | "number";
  name: string;
  placeholder: string;
  inputref: RefAttributes<HTMLInputElement>["ref"];
  value: string | undefined;
  errors?: boolean | undefined;
  errorMessage?: string | undefined;
  className?: string;

  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
}
