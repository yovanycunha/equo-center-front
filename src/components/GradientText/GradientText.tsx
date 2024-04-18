import { FC } from "react";
import scss from "./GradientText.module.scss";
import { IGradientTextProps } from "./types";

const GradientText: FC<IGradientTextProps> = (props) => {
  const visibleTextClass = [scss.visibleText];

  if (props.className) visibleTextClass.push(props.className);

  return (
    <div className={scss.container}>
      <span className={scss.hiddenText}>{props.text}</span>
      <span className={visibleTextClass.join(" ")} data-content={props.text} />
    </div>
  );
};

export default GradientText;
