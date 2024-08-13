import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <NavLink to={"/"}>
        {" "}
        <h1>Bejingled</h1>{" "}
      </NavLink>
      <img src="n/a" alt="Logo of Bejingled" />
      <NavLink to={'/signUp'}>Sign Up / Login</NavLink>
    </nav>
  );
};

export default NavBar;
