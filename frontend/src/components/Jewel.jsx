import React, { useEffect, useState } from "react";
import {
  areNextToEachOther,
  clearCoords,
  countNumInColumn,
  dropJewels,
  findCoordsOfMatches,
  findHorizontalCombos,
  findVerticalCombos,
  getCoordsFromString,
} from "../utils.js";

const Jewel = ({
  coord,
  chosen,
  setChosen,
  color,
  board,
  setBoard,
  setBadMove,
  setScore,
  score
}) => {
  // let selected = false;
  // const [selected, setSelected] = useState(false);
  // const [color, setColor] = useState(getRandomColor());

  const select = (e) => {
    // console.log(coord, getCoordsFromString(coord));
    if (chosen && chosen === coord) {
      setChosen(null);
    }
    if (chosen && areNextToEachOther(chosen, coord)) {
      let clone = JSON.parse(JSON.stringify(board));
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
      let hor = findHorizontalCombos(clone);
      let ver = findVerticalCombos(clone);
      let all = findCoordsOfMatches(hor, ver, clone);
      let count = 0;
      let bazinga = true;
      let cloneScore = score
      // console.log(hor);
      // console.log(ver);
      // console.log(all);

      if (
        // all.has(getCoordsFromString(coord).join("")) ||
        // all.has(getCoordsFromString(chosen).join(""))
        all.size > 0
      ) {
        while(count < 10 && bazinga) {
          console.log(count);
          setBoard(clearCoords(all, clone));
          // countNumInColumn(all).forEach(el => console.log(el));
          clone = dropJewels(all,clone);
          setScore(score + all.size);
          const check = findCoordsOfMatches(findHorizontalCombos(clone),findVerticalCombos(clone),clone);
          if (check.size === 0) {
            bazinga = false;
          }
          // dropJewels(all,clone);
          hor = findHorizontalCombos(clone);
          ver = findVerticalCombos(clone);
          all = findCoordsOfMatches(hor, ver, clone);
          setTimeout(() => {
            setBoard(clone);
          },count === 0 ? 250 : 500)
          count++;
        }

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
    // console.log(findHorizontalCombos(board));
    // console.log(findVerticalCombos(board));
  }, [board]);

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
