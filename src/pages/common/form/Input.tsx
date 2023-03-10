import React from "react";
import { Div } from "../containers";

export const Input = ({ id, fieldName, onChange, ...props }: any): JSX.Element => {
  return (
    <Div column>
      <label htmlFor={id}>{fieldName}</label>
      <input id={id} onChange={onChange} {...props} />
    </Div>
  );
};
