import React, { useEffect, useState } from "react";
import { areNextToEachOther, getCoordsFromString } from "../utils.js";

const Jewel = ({
  coord,
  chosen,
  setChosen,
  color,
  chosenColor,
  setChosenColor,
  board,
  setBoard,
}) => {
  // let selected = false;
  // const [selected, setSelected] = useState(false);
  // const [color, setColor] = useState(getRandomColor());

  const select = (e) => {
    if (chosen && chosen === coord) {
      setChosen(null);
    }
    if (chosen && areNextToEachOther(chosen, coord)) {
      const clone = JSON.parse(JSON.stringify(board));
      const [x1, y1] = getCoordsFromString(chosen);
      const [x2, y2] = getCoordsFromString(coord);
      // console.log(x1, y1, clone[x1][y1]);
      // console.log(x2, y2, clone[x2][y2]);
      let temp = clone[x1][y1];
      clone[x1][y1] = clone[x2][y2];
      clone[x2][y2] = temp;
      setBoard(clone);
      setChosen(null);
    } else {
      setChosen(coord);
      setChosenColor(color);
    }
  };

  useEffect(() => {
    // if (chosen === coord) {
    //   setSelected((pre) => !pre);
    //   // console.log(chosen)
    // } else {
    //   setSelected(false);
    // }
  }, [chosen]);

  return (
    <p
      className="jewel"
      style={{
        backgroundColor: color,
        border: `1px solid ${chosen === coord ? "gold" : "black"}`,
      }}
      onClick={select}
      data-coord={coord}
    ></p>
  );
};

export default Jewel;
