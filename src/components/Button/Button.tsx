import { CSSProperties, FC, MouseEvent, useEffect, useState } from "react";

import scss from "./Button.module.scss";

import { IButtonProps } from "./types";
import Loading from "../Loading/Loading";
import GradientText from "../GradientText/GradientText";

const Button: FC<IButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const buttonClass = [scss.btn];

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e);
  };

  const getStyle = () => {
    const style: CSSProperties = { width: "0%" };

    if (props.loadingProgress) style.width = `${props.loadingProgress}%`;

    return style;
  };

  if (props.className) buttonClass.push(props.className);

  useEffect(() => {
    setIsLoading(props.loading);
  }, [props.loading]);

  return (
    <button
      type={props.type === "button" ? "button" : "submit"}
      onClick={handleButtonClick}
      className={buttonClass.join(" ")}
      style={props.style}
      disabled={props.disabled}
    >
      <>
        <Loading
          loading={isLoading}
          secondary={props.secondary}
          hideContentOnLoading
          removePosition
        >
          <div className={scss.buttonProgress} style={getStyle()} />
          <div className={scss.buttonChildren}>
            {props.secondary ? (
              <GradientText text={`${props.children}`} className={scss.text} />
            ) : (
              <>{props.children}</>
            )}
          </div>
        </Loading>
      </>
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  loading: false,
} as IButtonProps;

export default Button;
