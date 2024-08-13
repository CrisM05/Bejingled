import React, { useContext, useEffect, useState } from "react";
import Jewel from "./Jewel";
import "../styles/Board.scss";
import { bazingaBoard, stringToBoard, checkForPossibleMatches } from "../utils";
import boardContext from "../contexts/BoardContext";
import { getFromLocalStorage, setLocalStorage } from "../localStorage";

const Board = ({ length, height }) => {
  const [board, setBoard] = useState(Array(8).fill(Array(8).fill("white")));
  // const [hCombos, setHCombos] = useState([]);
  // const [vCombos, setVCombos] = useState([]);
  const [canMove, setCanMove] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [badMove, setBadMove] = useState(false);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [score, setScore] = getFromLocalStorage('score') || useState(0);
  const { canBazinga, setCanBazinga, setYippie, gameJover, setGameJover } =
    useContext(boardContext);

  const bazinga = (yip = true, initial = false) => {
    let moves = bazingaBoard(board,initial);
    while (!checkForPossibleMatches(stringToBoard(moves[moves.length - 1]))) {
      moves = bazingaBoard(board);
    }
    setCanMove(false);
    setYippie(yip);
    // console.log(moves);
    let pointer = 0;
    const id = setInterval(() => {
      setBoard(stringToBoard(moves[pointer++]));
      // console.log(pointer);
      if (pointer === moves.length) {
        clearInterval(id);
        setCanMove(true);
        setCanBazinga(false);
        setYippie(false);
        setLocalStorage('userBoard',moves[pointer-1]);
        setGameJover(false);
      }
    }, 70);
  };

  useEffect(() => {
    const localBoard = getFromLocalStorage("userBoard");
    // console.log(localBoard.length);
    bazinga(false, localBoard && localBoard !== 'undefined' && localBoard.length === 64 ? localBoard : false);
  }, []);

  return (
    <>
      <div className={`board ${badMove ? "badMove" : ""}`}>
        {board.map((row, idx) => (
          <span key={idx} className="row" id={`row${idx}`}>
            {row.map((el, i) => (
              <Jewel
                key={i}
                chosen={chosen}
                setChosen={setChosen}
                coord={`${idx + 1}${letters[i]}`}
                color={el}
                board={board}
                setBoard={setBoard}
                setBadMove={setBadMove}
                setScore={setScore}
                score={score}
                canMove={canMove}
                setCanMove={setCanMove}
                bazinga={bazinga}
              />
            ))}
          </span>
        ))}
        <span id="score-wrapper">
          <h2>Score:</h2>
          <p>{score}</p>
        </span>
        {canBazinga && <p id="bazinga">BAZINGA</p>}
        {gameJover && <button onClick={() => bazinga(false)}>Replay?</button>}
      </div>
    </>
  );
};

export default Board;
