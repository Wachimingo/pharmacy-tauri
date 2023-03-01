import React from "react";
import { DISABLE, ERROR, INFO, SUCCESS, WARNING } from "../constants";
//@ts-ignore
import styles from "./button.module.css";

export const Button = ({ children, ...props }) => {
  let type = SUCCESS;
  if (props.success) type = SUCCESS;
  if (props.info) type = INFO;
  if (props.error) type = ERROR;
  if (props.warning) type = WARNING;
  if (props.disable) type = DISABLE;

  return <button className={`${styles.btn} ${styles[type]}`}>{children}</button>;
};
