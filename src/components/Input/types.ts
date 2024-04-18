import { RefAttributes, SyntheticEvent } from "react";

export interface IInputProps {
  type?: "text" | "password" | "email" | "number";
  name: string;
  placeholder: string;
  inputref: RefAttributes<HTMLInputElement>["ref"];
  value: string;
  errors?: boolean | undefined;
  errorMessage?: string | undefined;

  onChange?: (e: SyntheticEvent) => void;
  onBlur?: (e: SyntheticEvent) => void;
}
