import { useEffect, useState } from "react";
import BoardContext from "./BoardContext";
import { getFromLocalStorage, setLocalStorage } from "../localStorage";
import { fetchHandler } from "../utils";

const BoardContextProvider = ({ children }) => {
  const [activate, setActivate] = useState(false);
  const [canBazinga, setCanBazinga] = useState(false);
  const [gameJover, setGameJover] = useState(false);
  const [yippie, setYippie] = useState(false);
  const [jwt, setJwt] = useState(getFromLocalStorage("token"));
  const [userId, setUserId] = useState(-1);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const initialize = async () => {
      const [data, err] = await fetchHandler("/api/users/me", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      if (err) {
        setJwt(null);
        sessionStorage.setItem("token","");
        setUserData({});
        return;
      }
      setUserId(data.id);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (userId === -1) {
      return;
    }
    const getUserData = async () => {
      const [data, err] = await fetchHandler(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      if (err) {
        sessionStorage.setItem("token", "");
        setJwt(null);
        return;
      }
      setUserData(data);
    };
    getUserData();
  }, [userId]);

  const context = {
    activate,
    setActivate,
    canBazinga,
    setCanBazinga,
    gameJover,
    setGameJover,
    yippie,
    setYippie,
    jwt,
    setJwt,
    userId,
    setUserId,
    userData,
    setUserData
  };
  return (
    <BoardContext.Provider value={context}>{children}</BoardContext.Provider>
  );
};

export default BoardContextProvider;
