import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import styles from "./context.module.css";

export const Context = (props) => {
  const ref = useRef<any>(null);
  const { onClickOutside } = props;
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
      if (event.button === 2) {
        setCoordinates({ x: event.x, y: event.y });
      }
      event.stopPropagation();
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!props.show) return null;

  return (
    <div
      ref={ref}
      className={styles["info-box"]}
      style={{
        position: "absolute",
        top: `${coordinates.y - 50}px`,
        left: `${coordinates.x + 10}px`
      }}>
      {props.children}
    </div>
  );
};

export default Context;
