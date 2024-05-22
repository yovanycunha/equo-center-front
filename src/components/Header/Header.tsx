"use client";

import { CSSProperties, FC } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { IRenderLink } from "./types";
import useIsDesktop from "@/hooks/useIsDesktop";

const Header: FC = () => {
  const navContainer = [scss.navContainer];
  const isDesktop = useIsDesktop(1280);

  //TODO: Necessário incrementar para quando o usuário rolar a página realizar animação
  const getNavbarStyle = () => {
    const style: CSSProperties = { top: "0px" };

    return style;
  };

  const renderLink = ({ label, to }: IRenderLink) => {
    return (
      <li className={scss.linkWrapper}>
        <Link href={to} rel="noreferrer" className={scss.link}>
          {label}
        </Link>
      </li>
    );
  };

  return (
    <header className={scss.header}>
      <nav className={navContainer.join(" ")} style={getNavbarStyle()}>
        {isDesktop && (
          <ul className={scss.linksList}>
            {renderLink({ label: "Página Inicial", to: "/" })}
            {renderLink({ label: "Novo Praticante", to: "/praticante" })}
            {renderLink({ label: "Nova Equipe", to: "/centro" })}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
