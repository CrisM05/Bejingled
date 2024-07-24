import React, { useEffect, useState } from "react";
import Jewel from "./Jewel";
import "../styles/Board.scss";
import { findHorizontalCombos, findVerticalCombos, flattenBoard, generateRandomBoard } from "../utils";

const Board = ({ length, height }) => {
  const [board, setBoard] = useState(
    generateRandomBoard(Array(height).fill(Array(length)))
  );
  const [hCombos, setHCombos] = useState([]);
  const [vCombos, setVCombos] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [chosenColor, setChosenColor] = useState(null);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  useEffect(() => {
    setBoard(generateRandomBoard(board));
    // console.log(board);
  }, []);

  useEffect(() => {
    setHCombos(findHorizontalCombos(board));
    setVCombos(findVerticalCombos(board));
  },[board])
  
  return (
    <>
      <h2>Horizontal Matches {hCombos.map(el => <p key={el}> {el}</p>)}</h2>
      <h2>Vertical Matches {vCombos?.map(el => <p key={el}>{el}</p>)}</h2>
      <div className="board">
        {board.map((row, idx) => (
          <span className="row" id={`row${idx}`}>
            {row.map((el, i) => (
              <Jewel
                key={i}
                chosen={chosen}
                setChosen={setChosen}
                coord={`${idx + 1}${letters[i]}`}
                color={el}
                chosenColor={chosenColor}
                setChosenColor={setChosenColor}
                board={board}
                setBoard={setBoard}
              />
            ))}
          </span>
        ))}
      </div>
    </>
  );
};

export default Board;
