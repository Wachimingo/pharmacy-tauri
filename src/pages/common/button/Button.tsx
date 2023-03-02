import React from "react";
import { DISABLE, ERROR, INFO, SUCCESS, WARNING } from "../constants";
//@ts-ignore
import styles from "./button.module.css";
import { ButtonProps } from "./types";

export const Button = ({ children, success, info, error, warning, disable, ...props }: ButtonProps) => {
  let type = SUCCESS;
  if (success) type = SUCCESS;
  if (info) type = INFO;
  if (error) type = ERROR;
  if (warning) type = WARNING;
  if (disable) type = DISABLE;

  return (
    <button className={`${styles.btn} ${styles[type]}`} {...props}>
      {children}
    </button>
  );
};
