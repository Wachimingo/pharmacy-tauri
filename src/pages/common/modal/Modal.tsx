import React from "react";
import { ReactPortal } from "../portal";
//@ts-ignore
import styles from "./modal.module.css";
import { Div } from "../containers";
import { DISPLAY, HIDE } from "../constants";
import { CLOSE_BUTTON, MODAL_CONTENT, MODAL_WRAPPER } from "./constants";

export const Modal = ({ children, show, setShow, ...props }) => {
  const display = show ? DISPLAY : HIDE;
  return (
    <ReactPortal>
      <Div className={`${styles[MODAL_WRAPPER]} ${styles[display]}`} {...props}>
        <Div className={`${styles[MODAL_CONTENT]}`}>
          <span className={`${styles[CLOSE_BUTTON]}`} onClick={() => setShow(false)}>
            &times;
          </span>
          {children}
        </Div>
      </Div>
    </ReactPortal>
  );
};
