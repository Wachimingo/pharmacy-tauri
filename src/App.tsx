import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Inventory } from "./pages";
import { Navbar } from "./pages/common";

function App() {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Inventory />} />
        {/* <Route path='/about' element={<About />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
