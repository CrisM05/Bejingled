import React, { useEffect, useState } from "react";
import { areNextToEachOther, findCoordsOfMatches, findHorizontalCombos, findVerticalCombos, getCoordsFromString } from "../utils.js";

const Jewel = ({
  coord,
  chosen,
  setChosen,
  color,
  board,
  setBoard,
  setBadMove
}) => {
  // let selected = false;
  // const [selected, setSelected] = useState(false);
  // const [color, setColor] = useState(getRandomColor());

  const select = (e) => {
    console.log(coord, getCoordsFromString(coord));
    if (chosen && chosen === coord) {
      setChosen(null);
    }
    if (chosen && areNextToEachOther(chosen, coord)) {
      const clone = JSON.parse(JSON.stringify(board));
      const original = JSON.parse(JSON.stringify(board));
      const [x1, y1] = getCoordsFromString(chosen);
      const [x2, y2] = getCoordsFromString(coord);
      // console.log(x1, y1, clone[x1][y1]);
      // console.log(x2, y2, clone[x2][y2]);
      let temp = clone[x1][y1];
      clone[x1][y1] = clone[x2][y2];
      clone[x2][y2] = temp;
      setBoard(clone);
      setChosen(null);
      // console.log(findHorizontalCombos(clone),findVerticalCombos(clone));
      // console.log(typeof(getCoordsFromString(coord).join('')));
      const hor = findHorizontalCombos(clone);
      const ver = findVerticalCombos(clone);
      const all = findCoordsOfMatches(hor,ver,clone);

      if (all.has(getCoordsFromString(coord).join(''))) {
        
      } else {
        setBadMove(true);
        setTimeout(() => {
          setBoard(original);
          setBadMove(false);
        }, 500);
      }
    } else {
      setChosen(coord);
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
