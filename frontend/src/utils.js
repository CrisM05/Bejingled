export const getRandomColor = () => {
  const colors = [
    "#da0000",
    "#fe5302",
    "#d57d05",
    "#114d00",
    "#0758fe",
    "#7d0098",
    "#a999c3",
  ];
  const randomNum = Math.floor(Math.random() * 7);
  // return colors[randomNum];
  return colors[Math.floor(Math.random() * 7)];
};

export const generateRandomBoard = () => {
  const output = [[], [], [], [], [], [], [], []];
  for (let i = 0; i < output.length; i++) {
    for (let j = 0; j < output.length; j++) {
      const color = getRandomColor();
      if (j > 1 && output[i][j - 1] === color && output[i][j - 2] === color) {
        // console.log(i,j,color,output[i][j-1],output[i][j-2]);
        j--;
        continue;
      } else if (
        i > 1 &&
        output[i - 1][j] === color &&
        output[i - 2][j] === color
      ) {
        j--;
        continue;
      }
      output[i].push(color);
    }
  }
  // console.log(output)
  return output;
};

export const flattenBoard = (board) => {
  const output = [];
  let last = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      output.push(board[i][j]);
      // if (board[i][j] === last) {
      //   console.log("Bazinga");
      // }
      // last = board[i][j];
    }
  }
  // console.log(output);
  return output;
};

export const areNextToEachOther = (coord1, coord2) => {
  const [num1, letter1] = coord1.split("");
  const [num2, letter2] = coord2.split("");
  if (num1 !== num2 && letter1 !== letter2) {
    return false;
  }

  if (num1 === num2) {
    const letter1Code = letter1.charCodeAt(0);
    const letter2Code = letter2.charCodeAt(0);

    if (letter1Code + 1 !== letter2Code && letter1Code - 1 !== letter2Code) {
      return false;
    }
    // console.log(String.fromCharCode(letter1.charCodeAt(0)-1));
  }

  if (letter1 === letter2) {
    if (+num1 + 1 !== +num2 && +num1 - 1 !== +num2) {
      return false;
    }
  }
  return true;
};

export const getCoordsFromString = (str) => {
  const [num, letter] = str.split("");
  return [+num - 1, letter.charCodeAt(0) % 65];
};

export const findVerticalCombos = (board) => {
  // console.log("Checking for vertical matches.");
  let output = [];
  for (let j = 0; j < board[0].length; j++) {
    let count = 1;
    let start = 0;
    for (let i = 1; i < board.length; i++) {
      if (board[i][j] === board[i - 1][j]) {
        count++;
        if (count >= 3) {
          if (i === board.length - 1) {
            output.push([start, j]);
          }
        }
      } else {
        if (count >= 3) {
          output.push([start, j]);
        }
        count = 1;
        start = i;
      }
    }
  }
  return output;
};

export const findHorizontalCombos = (board) => {
  // console.log("Checking for horizontal matches.");
  let output = [];
  for (let i = 0; i < board.length; i++) {
    let count = 1;
    let start = 0;
    for (let j = 1; j < board[i].length; j++) {
      if (board[i][j] === board[i][j - 1]) {
        count++;
        if (count >= 3) {
          if (j === board[i].length - 1) {
            output.push([i, start]);
          }
        }
      } else {
        if (count >= 3) {
          output.push([i, start]);
        }
        count = 1;
        start = j;
      }
    }
  }
  return output;
};

export const findCoordsOfMatches = (hor, ver, board) => {
  const coords = new Set();
  for (const coord of hor) {
    // console.log(coord);
    const [x, y] = coord;
    let pointer = y;
    while (pointer < board[x].length && board[x][pointer] === board[x][y]) {
      // console.log(pointer,board[x][pointer],board[x][y],board[x].length);
      // console.log(pointer <= board[x].length && board[x][pointer] === board[x][y])
      // console.log(x,y)
      coords.add(`${x}${pointer++}`);
    }
  }

  for (const coord of ver) {
    const [x, y] = coord;
    // console.log(coord);
    let pointer = x;
    while (pointer < board.length && board[pointer][y] === board[x][y]) {
      coords.add(`${pointer++}${y}`);
    }
  }

  return coords;
};

export const clearCoords = (coords, board) => {
  const clone = JSON.parse(JSON.stringify(board));
  for (const coord of coords) {
    const [x, y] = coord.split("");
    clone[x][y] = "white";
  }
  return clone;
};

export const dropJewels = (coords, board) => {
  const clone = getBoardClone(board);
  const col = countNumInColumn(coords);
  coords = setToArray(coords);

  for (const c of col) {
    const [idx, count] = c;
    if (clone[0][idx] !== "white") {
      let row = 1;
      coords.forEach((el) => (row = +el[1] === idx ? +el[0] : row));
      // console.log(row - count);
      for (let i = row - count; i >= 0; i--, row--) {
        clone[row][idx] = board[i][idx];
      }
      for (let i = 0; i < count; i++) {
        clone[i][idx] = "white";
      }
    }
    // setTimeout(() => {
      for (let i = clone.length-1; i >= 0; i--) {
        for (let j = clone[i].length-1; j >= 0; j--) {
          if (clone[i][j] === 'white'){
            // console.log(clone[i][j]);
            clone[i][j] = getRandomColor();
          }
        }
      }
    // },200)
    // if (check.size > 0) {
    //   // return dropJewels(check,clone);
    //   console.log(check);
    // }
  }
  return clone;
};

// export const fillBoard = (board) => {
//   const clone = getBoardClone(board);
//   for (let i = clone.length - 1; i > 0; i--) {
//     for (let j = clone[i].length - 1; j >=0; j--) {
//       if (clone[i][j] === "white") {
//         clone[i][j] = getRandomColor();
//       }
//     }
//   }
//   return clone;
// }

export const countNumInColumn = (coords) => {
  const tracker = {};
  const output = [];
  coords = setToArray(coords);
  for (const coord of coords) {
    const [row, col] = coord.split("");
    if (col in tracker) {
      tracker[col]++;
    } else {
      tracker[col] = 1;
    }
  }

  for (const key in tracker) {
    output.push([+key, tracker[key]]);
  }
  return output;
};

export const setToArray = (set) => {
  const output = [];
  set.forEach((el) => output.push(el));
  return output;
};

export const getBoardClone = (board) => {
  return JSON.parse(JSON.stringify(board));
};
