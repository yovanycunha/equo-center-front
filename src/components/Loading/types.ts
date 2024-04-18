export interface ILoadingProps {
  loading: boolean;
  children: React.ReactChild | React.ReactChild[];
  className?: string;
  hideContentOnLoading?: boolean;
  removePosition?: boolean;
  secondary?: boolean;
}
