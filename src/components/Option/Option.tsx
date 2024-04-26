import { FC } from "react";
import { IOptionProps } from "./types";

import scss from "./Option.module.scss";

const Option: FC<IOptionProps> = (props) => {
  const containerClass = [scss.container];

  if (props.isOdd) containerClass.push(scss.isOdd);
  if (props.selected) containerClass.push(scss.selected);
  if (props.darkTheme) containerClass.push(scss.darkTheme);
  if (props.className) containerClass.push(props.className);

  return (
    <div
      role="option"
      className={containerClass.join(" ")}
      aria-selected={props.selected}
      data-selected={props.selected}
    >
      {props.children}
    </div>
  );
};

export default Option;
