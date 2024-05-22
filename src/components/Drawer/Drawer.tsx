"use client";

import { FC, useEffect, useState } from "react";
import CloseSVG from "./images/close.svg";

import scss from "./Drawer.module.scss";
import { IDrawerProps } from "./types";

const Drawer: FC<IDrawerProps> = ({ direction = "left", ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  const drawerWrapperClass = [scss.drawerWrapper];
  const drawerContentClass = [scss.drawerContent];

  const onCloseDrawer = () => {
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    if (props.open) {
      setShouldMount(true);

      setTimeout(() => setIsOpen(true), 100);
    } else {
      setIsOpen(false);

      setTimeout(() => setShouldMount(false), 100);
    }
  }, [props.open]);

  if (isOpen) {
    drawerWrapperClass.push(scss.drawerOpen);
    drawerContentClass.push(scss.drawerAnimation);
  }

  if (direction) drawerContentClass.push(scss[direction]);
  if (props.fullScreen) drawerContentClass.push(scss.fullScreen);
  if (props.className) drawerContentClass.push(props.className);

  const DrawerComponent = (
    <div className={drawerWrapperClass.join(" ")}>
      <div
        className={scss.drawerContainer}
        onClick={onCloseDrawer}
        aria-hidden="true"
      />
      <div
        className={drawerContentClass.join(" ")}
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-hidden="true"
      >
        {props.closeButton && (
          <CloseSVG className={scss.close} onClick={onCloseDrawer} />
        )}
        {props.children}
      </div>
    </div>
  );

  const renderDrawer = () => {
    if (shouldMount) {
      return DrawerComponent;
    }

    return null;
  };

  return renderDrawer();
};

export default Drawer;
