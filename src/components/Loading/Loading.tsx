import { FC } from "react";
import scss from "./Loading.module.scss";
import { ILoadingProps } from "./types";

const Loading: FC<ILoadingProps> = (props) => {
  const containerClass = [scss.container];

  if (props.className) containerClass.push(props.className);
  if (props.hideContentOnLoading && props.loading)
    containerClass.push(scss.hide);
  if (props.removePosition) containerClass.push(scss.removePosition);

  return (
    <div className={containerClass.join(" ")}>
      {props.loading && (
        <div className={scss.overlay}>
          <span className={scss.spin} />
        </div>
      )}
      <div className={scss.content}>{props.children}</div>
    </div>
  );
};

export default Loading;
