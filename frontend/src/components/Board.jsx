import React, { useEffect, useState } from "react";
import Jewel from "./Jewel";
import "../styles/Board.scss";
import { findCoordsOfMatches, findHorizontalCombos, findVerticalCombos, flattenBoard, generateRandomBoard } from "../utils";

const Board = ({ length, height }) => {
  const [board, setBoard] = useState(
    generateRandomBoard(Array(height).fill(Array(length)))
  );
  // const [hCombos, setHCombos] = useState([]);
  // const [vCombos, setVCombos] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [badMove, setBadMove] = useState(false);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [score, setScore] = useState(0);

  useEffect(() => {
    setBoard(generateRandomBoard(board));
    // console.log(board);
  }, []);

  useEffect(() => {
    // const horz = findHorizontalCombos(board); 
    // const vert = findVerticalCombos(board)
    // setHCombos(horz);
    // setVCombos(vert);
    // if (horz.length > 0 || vert.length > 0) {
    //   console.log(findCoordsOfMatches(horz,vert,board));
    // }
  },[board])
  
  return (
    <>
      <h2>Score:</h2>
      <p>{score}</p>
      <div className={`board ${badMove ? "badMove" : ''}`}>
        {board.map((row, idx) => (
          <span className="row" id={`row${idx}`}>
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
              />
            ))}
          </span>
        ))}
      </div>
    </>
  );
};

export default Board;
