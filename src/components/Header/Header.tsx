"use client";

import { CSSProperties, FC, useState } from "react";
import scss from "./Header.module.scss";
import useIsDesktop from "@/hooks/useIsDesktop";
import dynamic from "next/dynamic";
import HeaderLinks from "./components/HeaderLinks/HeaderLinks";

import MenuSVG from "./images/menu-hamburguer.svg";

const HDrawer = dynamic(
  () => import("./components/HeaderMobileContent/HeaderMobileContent"),
  {
    ssr: false,
  }
);

const Header: FC = () => {
  const isDesktop = useIsDesktop(720);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const navContainer = [scss.navContainer];

  const getNavbarStyle = () => {
    const style: CSSProperties = { top: "0px" };

    return style;
  };

  return (
    <header className={scss.header}>
      <nav className={navContainer.join(" ")} style={getNavbarStyle()}>
        {isDesktop && <HeaderLinks />}
        {!isDesktop && (
          <>
            <button
              type="button"
              className={scss.menuButton}
              onClick={() => {
                setDrawerVisible(true);
              }}
              aria-label="open mobile menu"
            >
              <MenuSVG className={scss.menuIcon} />
            </button>
            <HDrawer
              isOpen={drawerVisible}
              onClose={() => setDrawerVisible(false)}
            />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
