export interface IDrawerProps {
  className?: string;
  direction?: "left" | "right" | "bottom";

  open: boolean;
  fullScreen?: boolean;
  closeButton?: boolean;

  onClose: () => void;

  children: React.ReactNode;
}
