import Link from "next/link";
import { FC } from "react";
import { IHeaderLinksProps, IRenderLink } from "./types";
import RightArrowSVG from "./images/right-arrow.svg";

import scss from "./HeaderLinks.module.scss";
import useIsDesktop from "@/hooks/useIsDesktop";

const HeaderLinks: FC<IHeaderLinksProps> = (props) => {
  const isDesktop = useIsDesktop(720);

  const handleLinkClick = () => {
    if (props.onClick) props.onClick();
  };

  const renderLink = ({ label, to }: IRenderLink) => {
    return (
      <li className={scss.linkWrapper}>
        <Link
          href={to}
          rel="noreferrer"
          className={scss.link}
          onClick={handleLinkClick}
        >
          {label}
          {!isDesktop && <RightArrowSVG className={scss.arrow} />}
        </Link>
      </li>
    );
  };

  return (
    <ul className={scss.linksList}>
      {renderLink({ label: "Página Inicial", to: "/" })}
      {renderLink({ label: "Novo Praticante", to: "/praticante" })}
      {renderLink({ label: "Todos Praticantes", to: "/praticantes" })}
      {renderLink({ label: "Nova Equipe", to: "/centro" })}
    </ul>
  );
};

export default HeaderLinks;
