import React from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import "./navbar.module.css";
export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/inventory'>Inventory</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
