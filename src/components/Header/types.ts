import { LinkProps } from "next/link";

export interface IRenderLink {
  label: string;
  to: LinkProps["href"];
}
