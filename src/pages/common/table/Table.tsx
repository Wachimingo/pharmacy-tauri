import React from "react";
//@ts-ignore
import styles from "./table.module.css";

type TableProps = {
  id: string | undefined;
  headers: Array<string>;
  fields: Array<string>;
  data: any;
};

export const Table = ({ id = "data-table", headers = [], fields = [], data = [{}] }: TableProps) => {
  function contextMenuHandler(e) {
    e.preventDefault();
    console.log(this);
  }

  return (
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
          <tr key={item.id} onContextMenu={contextMenuHandler}>
            {fields.map((field, key) => (
              <td key={item[field] + key}>{item[field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
