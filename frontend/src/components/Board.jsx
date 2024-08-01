import React, { useContext, useEffect, useState } from "react";
import Jewel from "./Jewel";
import "../styles/Board.scss";
import { bazingaBoard, stringToBoard } from "../utils";
import boardContext from "../contexts/BoardContext";

const Board = ({ length, height }) => {
  const [board, setBoard] = useState(Array(8).fill(Array(8).fill("white")));
  // const [hCombos, setHCombos] = useState([]);
  // const [vCombos, setVCombos] = useState([]);
  const [canMove, setCanMove] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [badMove, setBadMove] = useState(false);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [score, setScore] = useState(0);
  const { setCanBazinga } = useContext(boardContext);

  const bazinga = () => {
    const moves = bazingaBoard(board);
    setCanMove(false);
    // console.log(moves);
    let pointer = 0;
    const id = setInterval(() => {
      setBoard(stringToBoard(moves[pointer++]));
      // console.log(pointer);
      if (pointer === moves.length) {
        clearInterval(id);
        setCanMove(true);
        setCanBazinga(false);
      }
    }, 70);
  };

  useEffect(() => {
    bazinga()
  }, []);


  return (
    <>
      <h2>Score:</h2>
      <p>{score}</p>
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
      </div>
    </>
  );
};

export default Board;
