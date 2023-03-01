import React from "react";
import { Main, Page } from "../common/containers";
//@ts-ignore
import styles from "./home.module.css";
export const Home = () => {
  return (
    <Page>
      <Main direction='column'>
        <h1>Pharmacy</h1>
        <p>This tool will help you to manage your pharmacy</p>
      </Main>
    </Page>
  );
};

export default Home;
