import React, { useEffect, useState } from "react";
import Jewel from "./Jewel";
import "../styles/Board.scss";
import { flattenBoard, generateRandomBoard } from "../utils";

const Board = ({ length, height }) => {
  const [board, setBoard] = useState(generateRandomBoard(Array(height).fill(Array(length))));
  const [chosen, setChosen] = useState(null);
  const [chosenColor, setChosenColor] = useState(null);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  useEffect(() => {
    setBoard(generateRandomBoard(board));
    // console.log(board);
  },[])

  // useEffect(() => {
  //   setBoard(generateRandomBoard(board));
  // }, [length, height]);
  return (
    <div className="board">
      {flattenBoard(board).map((el, i) => (
        <Jewel
          key={i}
          chosen={chosen}
          setChosen={setChosen}
          coord={`${Math.ceil((i + 1) / 8)}${letters[i % 8]}`}
          color={el}
          chosenColor={chosenColor}
          setChosenColor={setChosenColor}
          board={board}
          setBoard={setBoard}
        />
      ))}
    </div>
  );
};

export default Board;
