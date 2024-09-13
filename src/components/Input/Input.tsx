import { FC, SyntheticEvent, useState } from "react";
import scss from "./Input.module.scss";
import AlertIcon from "./images/alert.svg";
import { IInputProps } from "./types";

const Input: FC<IInputProps> = (props) => {
  const containerClass = [scss.container];
  const labelClass = [scss.label];
  const inputClass = [scss.input];
  const legendClass = [scss.legend];
  const fieldsetClass = [scss.fieldset];
  const [isFocused, setIsFocused] = useState(false);

  const handleBlurTrigger = (e: SyntheticEvent) => {
    if (props.onBlur) props.onBlur(e);
  };

  const onInputBlur = (e: SyntheticEvent) => {
    if (props.type !== "password") handleBlurTrigger(e);

    setIsFocused(false);
  };

  const onInputFocus = () => {
    // if (props.onFocus) props.onFocus();

    setIsFocused(true);
  };

  const renderErrorMessage = () => (
    <div className={scss.errorWrapper}>
      <AlertIcon className={scss.icon} />
      <span className={scss.errorMessage}>
        {props.errorMessage ? props.errorMessage : "Erro no campo"}
      </span>
    </div>
  );

  if (isFocused || (props.value && String(props.value)?.length! > 0)) {
    fieldsetClass.push(scss.fieldsetFocus);
    legendClass.push(scss.legendFocus);
    labelClass.push(scss.labelAnimate);
  }

  if (props.className) containerClass.push(props.className);
  if (props.disabled) containerClass.push(scss.disabled);
  if (props.disabled) inputClass.push(scss.disabled);

  return (
    <div className={containerClass.join(" ")}>
      <div className={scss.inputWrapper}>
        <label htmlFor={props.name} className={labelClass.join(" ")}>
          {props.placeholder}
        </label>
        <input
          type={props.type}
          ref={props.inputref}
          id={props.name}
          name={props.name}
          className={inputClass.join(" ")}
          placeholder={props.placeholder}
          onBlur={onInputBlur}
          onChange={props.onChange}
          onFocus={onInputFocus}
        />
        <fieldset aria-hidden="true" className={fieldsetClass.join(" ")}>
          <legend className={legendClass.join(" ")}>
            <span className={scss.legendTitle}>{props.placeholder}</span>
          </legend>
        </fieldset>
      </div>
      {props.errors && renderErrorMessage()}
    </div>
  );
};

export default Input;
