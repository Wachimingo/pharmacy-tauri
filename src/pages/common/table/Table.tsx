import React from "react";
//@ts-ignore
import styles from "./table.module.css";
export const Table = ({ id, data }) => {
  if (data === null) data = [];
  return (
    <table id={id} className={styles}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Adquisition Date</th>
          <th>Expiration Date</th>
          <th>Laboratory</th>
          <th>Unit Price</th>
          <th>Total Amount</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.adquisition_date}</td>
            <td>{item.expiration_date}</td>
            <td>{item.lab}</td>
            <td>{item.price}</td>
            <td>{item.amount}</td>
            <td>{item.total_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
