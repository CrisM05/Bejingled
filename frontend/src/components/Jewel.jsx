import React, { useContext, useEffect, useState } from "react";
import {
  areNextToEachOther,
  findCoordsOfMatches,
  findHorizontalCombos,
  findVerticalCombos,
  getCoordsFromString,
  computeNextMoves,
  stringToBoard,
  checkForPossibleMatches,
  fetchHandler,
} from "../utils.js";
import boardContext from "../contexts/BoardContext.jsx";

const Jewel = ({
  coord,
  chosen,
  setChosen,
  color,
  board,
  setBoard,
  setBadMove,
  setScore,
  canMove,
  setCanMove,
  bazinga,
  score
}) => {
  const { canBazinga, setCanBazinga, setGameJover, userId, userData } =
    useContext(boardContext);
  let localScore = score;
  const select = (e) => {
    if (!canMove) {
      return;
    }
    let refresh = canBazinga;

    if (chosen && chosen === coord) {
      setChosen(null);
      return;
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
      setCanMove(false);
      // console.log(findHorizontalCombos(clone),findVerticalCombos(clone));
      // console.log(typeof(getCoordsFromString(coord).join('')));
      let hor = findHorizontalCombos(clone);
      let ver = findVerticalCombos(clone);
      let all = findCoordsOfMatches(hor, ver, clone);
      // console.log(hor);
      // console.log(ver);
      // console.log(all);

      if (
        // all.has(getCoordsFromString(coord).join("")) ||
        // all.has(getCoordsFromString(chosen).join(""))
        all.size > 0
      ) {
        // console.clear();
        const nextMoves = computeNextMoves(clone);
        // console.log(nextMoves);
        let pointer = 0;
        let matches = 0;
        const id = setInterval(async () => {
          if (Array.isArray(nextMoves[pointer])) {
            const [str, score] = nextMoves[pointer++];
            // console.log(str,score);
            setBoard(stringToBoard(str));
            // console.log(getFromLocalStorage('userBoard'));
            // console.log(str)
            if (score > 3) {
              localScore+= 300 + (score -3) * 150
              setScore(localScore);
              matches += Math.floor(score / 3);
            } else {
              localScore += 300;
              setScore(localScore);
              matches++;
            }
          } else {
            setBoard(stringToBoard(nextMoves[pointer++]));
            // console.log(setLocalStorage("userBoard", nextMoves[pointer]));
            // console.log(nextMoves[pointer]);
          }
          if (pointer === nextMoves.length) {
            clearInterval(id);
            clone = stringToBoard(nextMoves[pointer - 1]);
            if (matches >= 4) {
              if (userId) {
                if (userData.bazinga !== true) {
                  await fetchHandler(`/api/users/${userId}/bazinga`, {
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${sessionStorage.getItem(
                        "token"
                      )}`,
                    },
                    body: "true",
                  });
                }
              }
              setCanBazinga(true);
              refresh = true;
            }
            if (!checkForPossibleMatches(clone)) {
              if (refresh) {
                console.log("BAZINGA");
                bazinga();
                await fetchHandler(`/api/users/${userId}/bazinga`, {
                  method: "PATCH",
                  headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                  },
                  body: "false",
                });
              } else {
                setGameJover(true);
              }
            }
            if (userId) {
              await fetchHandler(`/api/users/${userId}/board`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${
                    sessionStorage.getItem("token") || ""
                  }`,
                },
                body: nextMoves[pointer - 1],
              });
              await fetchHandler(`/api/users/${userId}/score`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: `${localScore}`,
              });
            }
            setCanMove(true);
          }
        }, 200);
      } else {
        setBadMove(true);
        setTimeout(() => {
          setBoard(original);
          setBadMove(false);
          setCanMove(true);
        }, 500);
      }
    } else {
      setChosen(coord);
    }
  };

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
