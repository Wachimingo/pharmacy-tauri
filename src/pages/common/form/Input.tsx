import React from "react";
import { Div } from "../containers";

export const Input = ({ type, id, fieldName, action }: any): JSX.Element => {
  return (
    <Div column>
      <label htmlFor={id}>{fieldName}</label>
      <input id={id} type={type} />
    </Div>
  );
};
