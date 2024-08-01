import { useState } from "react";
import BoardContext from "./BoardContext";

const BoardContextProvider = ({ children }) => {
  const [activate, setActivate] = useState(false);
  const [canBazinga, setCanBazinga] = useState(false);
  const [gameJover, setGameJover] = useState(false);
  const [yippie, setYippie] = useState(false);

  const context = { activate, setActivate, canBazinga, setCanBazinga, gameJover, setGameJover, yippie,setYippie };
  return (
    <BoardContext.Provider value={context}>{children}</BoardContext.Provider>
  );
};

export default BoardContextProvider;
