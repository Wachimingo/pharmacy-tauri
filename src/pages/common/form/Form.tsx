import React from "react";
import { FORM, FORM_INNER_CONTAINER } from "./constants";
//@ts-ignore
import styles from "./form.module.css";

export const Form = ({ children, ...props }) => {
  return (
    <form className={styles[FORM]}>
      <div className={styles[FORM_INNER_CONTAINER]}>{children}</div>
      <input type='submit' />
    </form>
  );
};
