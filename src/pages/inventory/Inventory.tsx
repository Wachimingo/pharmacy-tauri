import React from "react";
import { Main, Page, Section, Table, Button, Div } from "../common";
import { invoke } from "@tauri-apps/api";
import { Modal } from "../common/modal";
import { ADD, ADD_PRODUCT, INVENTORY } from "./constants";
import { Form } from "../common/form/Form";
import { Product } from "./types";

let data: string | undefined = await invoke("json_file", { name: "inventory.json" });
const product: Product = JSON.parse(data!);
data = undefined;

export const Inventory = () => {
  const saveToJSON = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <>
      <Page column>
        <h1>{INVENTORY}</h1>
        <Section>
          <Button success>{ADD}</Button>
        </Section>
        <br />
        <Main column>
          <Table id={INVENTORY} data={product} />
        </Main>
      </Page>
      <Modal show={false}>
        <h1>{ADD_PRODUCT}</h1>
        <Form id='addProduct' onSubmit={(e) => saveToJSON(e)}>
          <Div column>
            <label htmlFor='id'>Name</label>
            <input id='name' type='text' />
          </Div>
          <Div column>
            <label htmlFor='description'>Description</label>
            <input id='description' type='text' />
          </Div>
          <Div column>
            <label htmlFor='expires'>Expires in:</label>
            <input id='expires' type='text' />
          </Div>
          <Div column>
            <label htmlFor='lab'>Laboratory</label>
            <input id='lab' type='text' />
          </Div>
          <Div column>
            <label htmlFor='price'>Price</label>
            <input id='price' type='text' />
          </Div>
          <Div column>
            <label htmlFor='amount'>Amount</label>
            <input id='amount' type='text' />
          </Div>
        </Form>
      </Modal>
    </>
  );
};

export default Inventory;
