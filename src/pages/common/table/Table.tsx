import React, { useState } from "react";
//@ts-ignore
import styles from "./table.module.css";
import Context from "../menu/Context";

type TableProps = {
  id: string | undefined;
  headers: Array<string>;
  fields: Array<string>;
  data: any;
};

export const Table = ({ id = "data-table", headers = [], fields = [], data = [{}] }: TableProps) => {
  const [showContext, setShowContext] = useState(false);
  return (
    <>
      <table id={id} className={styles}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr
              key={item.id}
              onContextMenu={(e: React.MouseEvent) => {
                e.preventDefault();
                setShowContext(true);
              }}>
              {fields.map((field, key) => (
                <td key={item[field] + key}>{item[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Context
        show={showContext}
        onClickOutside={() => {
          setShowContext(false);
        }}
        message='Opened context menu'
      />
    </>
  );
};
