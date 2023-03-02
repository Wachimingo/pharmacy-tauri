import React, { useState } from "react";
import { Main, Page, Section, Table, Button } from "../common";
import { invoke } from "@tauri-apps/api";
import { Modal } from "../common/modal";
import { ADD, ADD_PRODUCT, AMOUNT, DESCRIPTION, EXPIRES, EXPIRES_IN, INVENTORY, LAB, LABORATORY, NAME, TEXT } from "./constants";
import { Form } from "../common/form/Form";
import { Product } from "./types";
import { Input } from "../common/form";

let data: string | undefined = await invoke("json_file", { name: "inventory.json" });
const product: Product = JSON.parse(data!);
data = undefined;

export const Inventory = () => {
  const [showPopup, setShowPopup] = useState(false);

  const buttonHandler = () => {
    setShowPopup(true);
  };

  const saveToJSON = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
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
          <Table id={INVENTORY} data={product} />
        </Main>
      </Page>
      <Modal show={showPopup} setShow={setShowPopup}>
        <h1>{ADD_PRODUCT}</h1>
        <Form id='addProduct' onSubmit={(e: React.FormEvent<HTMLFormElement>) => saveToJSON(e)}>
          <Input type={TEXT} id={NAME.toLowerCase()} fieldName={NAME} />
          <Input type={TEXT} id={DESCRIPTION.toLowerCase()} fieldName={DESCRIPTION} />
          <Input type={TEXT} id={EXPIRES} fieldName={EXPIRES_IN} />
          <Input type={TEXT} id={LAB} fieldName={LABORATORY} />
          <Input type={TEXT} id={AMOUNT.toLowerCase()} fieldName={AMOUNT} />
        </Form>
      </Modal>
    </>
  );
};

export default Inventory;
