import React, { useEffect, useState } from "react";
import { Main, Page, Section, Table, Button } from "../common";
import { invoke } from "@tauri-apps/api";
import { Modal } from "../common/modal";
import { ADD, ADD_PRODUCT, AMOUNT, DATE, DESCRIPTION, EXPIRES, EXPIRES_IN, INVENTORY, LAB, LABORATORY, NAME, NUMBER, PRICE, TEXT } from "./constants";
import { Form } from "../common/form/Form";
import { Input } from "../common/form";
import { Product } from "./types";

// const data: Product[] = await invoke("json_file", { name: "inventory.json" });

export const Inventory = () => {
  const [data, setData] = useState<Product[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [expires, setExpires] = useState<string>();
  const [lab, setLab] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [amount, setAmount] = useState<number>();
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
      product: { last_id: data![data!.length - 1].id, name, description, expiration_date: expires, lab, price, amount }
    });
    setData((prev: Product[]) => [...prev, newProduct]);
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
          <Table id={INVENTORY} data={data} />
        </Main>
      </Page>
      <Modal show={showPopup} setShow={setShowPopup}>
        <h1>{ADD_PRODUCT}</h1>
        <Form id='addProduct' onSubmit={(e: React.FormEvent<HTMLFormElement>) => saveToJSON(e)}>
          <Input type={TEXT} id={NAME.toLowerCase()} fieldName={NAME} onChange={(e) => setName(e.target.value)} />
          <Input type={TEXT} id={DESCRIPTION.toLowerCase()} fieldName={DESCRIPTION} onChange={(e) => setDescription(e.target.value)} />
          <Input type={DATE} id={EXPIRES} fieldName={EXPIRES_IN} onChange={(e) => setExpires(e.target.value)} />
          <Input type={TEXT} id={LAB} fieldName={LABORATORY} onChange={(e) => setLab(e.target.value)} />
          <Input type={NUMBER} id={PRICE.toLowerCase()} fieldName={PRICE} onChange={(e) => setPrice(+e.target.value)} />
          <Input type={NUMBER} id={AMOUNT.toLowerCase()} fieldName={AMOUNT} onChange={(e) => setAmount(+e.target.value)} />
        </Form>
      </Modal>
    </>
  );
};

export default Inventory;
