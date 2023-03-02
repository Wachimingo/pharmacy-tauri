export type ButtonProps = {
  children: any;
  success?: boolean;
  info?: boolean;
  error?: boolean;
  warning?: boolean;
  disable?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};
