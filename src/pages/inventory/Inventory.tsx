import React, { useState } from "react";
import { Main, Page, Section, Table, Button } from "../common";
import { invoke } from "@tauri-apps/api";
import { Modal } from "../common/modal";
import { ADD, ADD_PRODUCT, AMOUNT, DESCRIPTION, EXPIRES, EXPIRES_IN, INVENTORY, LAB, LABORATORY, NAME, TEXT } from "./constants";
import { Form } from "../common/form/Form";
import { Input } from "../common/form";
import { Product } from "./types";

const data: Product[] = await invoke("json_file", { name: "inventory.json" });
console.log(data);

export const Inventory = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [expires, setExpires] = useState();
  const [lab, setLab] = useState();
  const [amount, setAmount] = useState();
  const buttonHandler = () => {
    setShowPopup(true);
  };

  const saveToJSON = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, description, expires, lab, amount);
    // const res = await invoke("save_to_json_file", { product: JSON.stringify({ name, description, expires, lab, amount }) });
    const res = await invoke("save_to_json_file", { product: { name, description, expires, lab, amount } });
    console.log(res);
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
          <Input type={TEXT} id={EXPIRES} fieldName={EXPIRES_IN} onChange={(e) => setExpires(e.target.value)} />
          <Input type={TEXT} id={LAB} fieldName={LABORATORY} onChange={(e) => setLab(e.target.value)} />
          <Input type={TEXT} id={AMOUNT.toLowerCase()} fieldName={AMOUNT} onChange={(e) => setAmount(e.target.value)} />
        </Form>
      </Modal>
    </>
  );
};

export default Inventory;
