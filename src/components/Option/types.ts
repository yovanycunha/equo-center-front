export interface IOptionProps {
  value: string;
  selected: boolean;

  children: React.ReactNode;

  isOdd?: boolean;
  darkTheme?: boolean;

  className?: string;

  label?: JSX.Element;
}
