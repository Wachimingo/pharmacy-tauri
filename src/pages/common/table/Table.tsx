import React from "react";
//@ts-ignore
import styles from "./table.module.css";
export const Table = ({ id, data }) => {
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
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.adquisitionDate}</td>
            <td>{item.expirationDate}</td>
            <td>{item.lab}</td>
            <td>{item.price}</td>
            <td>{item.amount}</td>
            <td>{item.totalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
