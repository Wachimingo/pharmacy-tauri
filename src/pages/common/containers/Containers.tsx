//@ts-ignore
import { jsx } from "react/jsx-runtime";
import { COLUMN, DIV, MAIN, ROW, SECTION } from "./constants";
//@ts-ignore
import styles from "./container.module.css";
import { ContainerProps } from "./types";

const containerBuilder = (HtmlElement: string, { children, column, row, ...props }: ContainerProps, extendedClass?: string): JSX.Element => {
  let direction: string = COLUMN;
  if (column) direction = COLUMN;
  if (row) direction = ROW;

  return jsx(HtmlElement, {
    children,
    className: `${styles.container} ${styles[direction]}${extendedClass ? " " + extendedClass : ""}`,
    ...props
  });
};

export const Page = (props: ContainerProps): JSX.Element => containerBuilder(DIV, props, styles.page);
export const Div = (props: ContainerProps): JSX.Element => containerBuilder(DIV, props, undefined);
export const Main = (props: ContainerProps): JSX.Element => containerBuilder(MAIN, props, undefined);
export const Section = (props: ContainerProps): JSX.Element => containerBuilder(SECTION, props, undefined);
