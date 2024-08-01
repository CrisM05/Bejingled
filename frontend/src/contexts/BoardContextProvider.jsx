import { useState } from "react";
import BoardContext from "./BoardContext";

const BoardContextProvider = ({ children }) => {
  const [activate, setActivate] = useState(false);
  const [canBazinga, setCanBazinga] = useState(false);

  const context = { activate, setActivate, canBazinga, setCanBazinga };
  return (
    <BoardContext.Provider value={context}>{children}</BoardContext.Provider>
  );
};

export default BoardContextProvider;
