import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import boardContext from "../contexts/BoardContext";

const NavBar = () => {
  const {  userData } = useContext(boardContext);
  const jwt = sessionStorage.getItem('token');
  return (
    <nav>
      <NavLink to={"/"}>
        {" "}
        <h1>Bejingled</h1>{" "}
      </NavLink>
      <img src="n/a" alt="Logo of Bejingled" />
      <div>
        <NavLink to={"/game"}>Play Game</NavLink>
      <NavLink to={"/highScores"}>High Scores</NavLink>
      <NavLink to={jwt ? "/profile" : "/signIn"}>
        {jwt ? `${userData.displayName}` : "Sign In"}
      </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
