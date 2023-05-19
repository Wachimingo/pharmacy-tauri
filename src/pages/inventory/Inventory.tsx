import React, { useEffect, useState } from "react";
import { Main, Page, Section, Table, Button } from "../common";
import { invoke } from "@tauri-apps/api";
import { Modal } from "../common/modal";
import { ADD, ADD_PRODUCT, AMOUNT, DATE, DESCRIPTION, EXPIRES_IN, INVENTORY, LAB, LABORATORY, NAME, NUMBER, PRICE, TEXT } from "./constants";
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
  const [oldProduct, setOldProduct] = useState({});
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isModify, setIsModify] = useState<boolean>(false);

  const buttonHandler = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    const loadFromJSON = async (): Promise<void> => {
      const productsInFile: Product[] = await invoke("json_file", { name: "inventory.json" });
      setData(productsInFile);
    };
    loadFromJSON();
    return () => {
      setData([]);
    };
  }, []);

  const cleanUpProduct = (): void => {
    setIsModify(false);
    setOldProduct({});
    setProduct((prev) => {
      prev.id = 0;
      prev.name = "";
      prev.description = "";
      prev.adquisitionDate = "";
      prev.expirationDate = "";
      prev.lab = "";
      prev.price = 0;
      prev.amount = 0;
      prev.totalPrice = 0;
      return prev;
    });
  };
  const closeModal = (): void => {
    cleanUpProduct();
    setShowPopup(false);
  };
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
    cleanUpProduct();
    setShowPopup(false);
  };

  function openModifyProduct(): void {
    setIsModify(true);
    setOldProduct(this);
    setProduct((prev: Product) => {
      prev.id = this.id;
      prev.name = this.name;
      prev.description = this.description;
      prev.adquisitionDate = this.adquisition_date;
      prev.expirationDate = this.expiration_date;
      prev.lab = this.lab;
      prev.price = this.price;
      prev.amount = this.amount;
      prev.totalPrice = this.total_price;
      return prev;
    });
    setShowPopup(true);
  }

  async function saveModifiyProducts(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const modifiedProduct = await invoke("save_modified_to_json_file", {
      name: "inventory.json",
      oldProduct,
      product: {
        last_id: product.id,
        name: product.name,
        description: product.description,
        expiration_date: product.expirationDate,
        lab: product.lab,
        price: product.price,
        amount: product.amount
      }
    });
    setData(modifiedProduct as Product[]);
    cleanUpProduct();
    setShowPopup(false);
  }

  const updateProductState = (key, data) => {
    setProduct((prev) => {
      prev[key] = data;
      return prev;
    });
  };

  return (
    <>
      <Page key='product-page' column>
        <h1>{INVENTORY}</h1>
        <Section key='control-section'>
          <Button success onClick={() => buttonHandler()}>
            {ADD}
          </Button>
        </Section>
        <br />
        <Main key='main-section' column>
          <Table
            key='product-table'
            id={`${INVENTORY}-table`}
            headers={headers}
            fields={fields}
            data={data}
            addNewData={saveToJSON}
            modifyData={openModifyProduct}
            deleteData={() => null}
          />
        </Main>
      </Page>
      <Modal key='product-modal' show={showPopup} closeModal={closeModal} setShow={setShowPopup}>
        <h1>{ADD_PRODUCT}</h1>
        <Form
          id={!isModify ? "addProduct" : "modifyProduct"}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            !isModify ? saveToJSON(e) : saveModifiyProducts(e);
          }}>
          <Input
            type={TEXT}
            id='name '
            fieldName='Name'
            key={product.name ? "nameIsloaded" : "nameIsnotLoaded"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("name", e.target.value)}
            defaultValue={product.name}
          />
          <Input
            type={TEXT}
            id='description'
            fieldName='Description'
            key={product.description ? "descriptionIsloaded" : "descriptionIsnotLoaded"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("description", e.target.value)}
            defaultValue={product.description}
          />
          <Input
            type={DATE}
            id='expirationDate'
            fieldName='Expiration Date'
            key={product.expirationDate ? "expirationDateIsloaded" : "expirationDateIsnotLoaded"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("expirationDate", e.target.value)}
            defaultValue={product.expirationDate}
          />
          <Input
            type={TEXT}
            id='lab'
            fieldName={LABORATORY}
            key={product.lab ? "labIsloaded" : "labIsnotLoaded"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("lab", e.target.value)}
            defaultValue={product.lab}
          />
          <Input
            type={NUMBER}
            id='price'
            fieldName='Price'
            key={product.price ? "priceIsloaded" : "priceIsnotLoaded"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("price", +e.target.value)}
            defaultValue={+product.price}
          />
          <Input
            type={NUMBER}
            id='amount'
            fieldName='Amount'
            key={product.amount ? "amountIsloaded" : "amountIsnotLoaded"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProductState("amount", +e.target.value)}
            defaultValue={+product.amount}
          />
        </Form>
      </Modal>
    </>
  );
};

export default Inventory;
