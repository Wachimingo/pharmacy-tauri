import React, { useEffect, useState } from "react";
import { Main, Page, Section, Table, Button } from "../common";
import { invoke } from "@tauri-apps/api";
import { Modal } from "../common/modal";
import { ADD, ADD_PRODUCT, AMOUNT, DATE, DESCRIPTION, EXPIRES, EXPIRES_IN, INVENTORY, LAB, LABORATORY, NAME, NUMBER, PRICE, TEXT } from "./constants";
import { Form } from "../common/form/Form";
import { Input } from "../common/form";
import { Product } from "./types";

const headers: Array<string> = ["ID", NAME, DESCRIPTION, DATE, EXPIRES_IN, LAB, PRICE, AMOUNT, "Total Price"];
const fields: Array<string> = ["id", "name", "description", "adquisition_date", "expiration_date", "lab", "price", "amount", "total_price"];

export const Inventory = () => {
  const [data, setData] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    adquisitionDate: "",
    expirationDate: "",
    lab: "",
    price: 0,
    amount: 0,
    totalPrice: 0
  });
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const buttonHandler = () => {
    setShowPopup(true);
  };
  useEffect(() => {
    const loadFromJSON = async (): Promise<void> => {
      const productsInFile: Product[] = await invoke("json_file", { name: "inventory.json" });
      setData(productsInFile);
    };
    loadFromJSON();
  }, []);

  const saveToJSON = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const newProduct: Product = await invoke("save_to_json_file", {
      name: "inventory.json",
      product: {
        last_id: data![data!.length - 1].id,
        name: product.name,
        description: product.description,
        expiration_date: product.expirationDate,
        lab: product.lab,
        price: product.price,
        amount: product.amount
      }
    });
    setData((prev: Product[]) => [...prev, newProduct]);
  };

  async function modifiyProducts(): Promise<void> {
    console.log(this);
  }

  const updateProductState = (key, data) => {
    setProduct((prev) => {
      prev[key] = data;
      return prev;
    });
  };

  return (
    <>
      <Page column>
        <h1>{INVENTORY}</h1>
        <Section>
          <Button success onClick={() => buttonHandler()}>
            {ADD}
          </Button>
        </Section>
        <br />
        <Main column>
          <Table
            id={`${INVENTORY}-table`}
            headers={headers}
            fields={fields}
            data={data}
            addNewData={saveToJSON}
            modifyData={modifiyProducts}
            deleteData={() => null}
          />
        </Main>
      </Page>
      <Modal show={showPopup} setShow={setShowPopup}>
        <h1>{ADD_PRODUCT}</h1>
        <Form id='addProduct' onSubmit={(e: React.FormEvent<HTMLFormElement>) => saveToJSON(e)}>
          <Input type={TEXT} id='name ' fieldName='Name' onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("name", e.target.value)} />
          <Input
            type={TEXT}
            id='description'
            fieldName='Description'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("description", e.target.value)}
          />
          <Input
            type={DATE}
            id='expirationDate'
            fieldName='Expiration Date'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("expirationDate", e.target.value)}
          />
          <Input type={TEXT} id='lab' fieldName={LABORATORY} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("lab", e.target.value)} />
          <Input
            type={NUMBER}
            id='price'
            fieldName='Price'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("price", +e.target.value)}
          />
          <Input
            type={NUMBER}
            id='amount'
            fieldName='Amount'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("amount", +e.target.value)}
          />
        </Form>
      </Modal>
    </>
  );
};

export default Inventory;
