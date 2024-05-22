import { LinkProps } from "next/link";

export interface IRenderLink {
  label: string;
  to: LinkProps["href"];
}

export interface IHeaderLinksProps {
  onClick?: () => void;
}
