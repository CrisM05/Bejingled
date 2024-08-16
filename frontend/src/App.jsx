import React, { useContext, useState } from "react";
import Board from "./components/Board";
import NavBar from "./components/NavBar";
import boardContext from "./contexts/BoardContext";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import HighScoresPage from "./pages/HighScoresPage";

const App = () => {
  const [length, setLength] = useState(8);
  const [height, setHeight] = useState(8);
  const { yippie } = useContext(boardContext);

  return ( 
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/game"
          element={
            <main>
              {yippie && <h1>BAZINGA</h1>}
              <div id="board-wrapper">
                <Board length={length} height={height} />
              </div>
            </main>
          }
        />
        < Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/highScores" element={<HighScoresPage/>}/>
      </Routes>
    </>
  );
};

export default App;
