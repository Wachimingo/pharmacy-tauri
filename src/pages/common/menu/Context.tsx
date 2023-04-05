import React, { useEffect, useRef } from "react";
//@ts-ignore
import styles from "./context.module.css";

export const Context = (props) => {
  const ref = useRef<any>(null);
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event);
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!props.show) return null;

  return (
    <div ref={ref} className={styles["info-box"]}>
      {props.message}
    </div>
  );
};

export default Context;
