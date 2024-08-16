const colors = [
  "#da0000",
  "#fe5302",
  "#d57d05",
  "#114d00",
  "#0758fe",
  "#7d0098",
  "#a999c3",
];
export const getRandomColor = () => {
  const randomNum = Math.floor(Math.random() * 7);
  return colors[randomNum];
  // return colors[Math.floor(Math.random() * 7)];
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
      if (board[i][j] !== 'white' && board[i][j] === board[i - 1][j]) {
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
      if (board[i][j] !=='white' && board[i][j] === board[i][j - 1]) {
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
    // for (let i = clone.length - 1; i >= 0; i--) {
    //   for (let j = clone[i].length - 1; j >= 0; j--) {
    //     if (clone[i][j] === "white") {
    //       // console.log(clone[i][j]);
    //       clone[i][j] = getRandomColor();
    //     }
    //   }
    // }
    // },200)
    // if (check.size > 0) {
    //   // return dropJewels(check,clone);
    //   console.log(check);
    // }
  }
  return clone;
};

export const fillBoard = (board) => {
  const clone = getBoardClone(board);
  for (let i = clone.length - 1; i >= 0; i--) {
    for (let j = clone[i].length - 1; j >= 0; j--) {
      if (clone[i][j] === "white") {
        clone[i][j] = getRandomColor();
      }
    }
  }
  return clone;
};

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

export const checkForPossibleMatches = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const jewel = board[i][j];
      if (board[i][j] === 'white') {
        continue;
      }
      // For [X,?,x] matches
      if (j < board[i].length - 1 && jewel === board[i][j + 2]) {
        //     [?,x,?]
        // For [X,?,x] vertical check
        if (i > 0 && jewel === board[i - 1][j + 1]) {
          console.log([i, j], [i, j + 2]);
          return true;
        }
        // For [X,?,x] vertical check
        //     [?,x,?]
        if (i < board.length - 1 && jewel === board[i + 1][j + 1]) {
          console.log([i, j], [i, j + 2]);
          return true;
        }
      }

      //For [X]
      //    [?]
      //    [x] matches
      if (i < board.length - 3 && jewel === board[i + 2][j]) {
        //For [?,X,?]
        //    [x,?,?]
        //    [?,x,?]
        if (j > 0 && jewel === board[i + 1][j - 1]) {
          console.log([i, j], [i + 2, j]);
          return true;
        }
        //For [?,X,?]
        //    [?,?,x]
        //    [?,x,?]
        if (j < board[i].length - 1 && jewel === board[i + 1][j + 1]) {
          console.log([i, j], [i + 2, j]);
          return true;
        }
      }

      //For [X,x] matches
      if (j < board[i].length - 1 && jewel === board[i][j + 1]) {
        //For [x,?,?,?]
        //    [?,X,x,?]
        if (i > 0 && j > 0 && jewel === board[i - 1][j - 1]) {
          console.log([i, j], [i, j + 1]);
          return true;
        }
        //For [?,?,?,x]
        //    [?,X,x,?]
        if (i > 0 && j < board[i].length - 1 && jewel === board[i - 1][j + 2]) {
          console.log([i, j], [i - 1, j + 1]);
          return true;
        }
        //For [?,X,x,?]
        //    [x,?,?,?]
        if (i < board.length - 1 && j > 0 && jewel === board[i + 1][j - 1]) {
          console.log([i, j], [i, j + 1]);
          return true;
        }
        //For [?,X,x,?]
        //    [?,?,?,x]
        if (
          i < board.length - 1 &&
          j < board[i].length - 2 &&
          jewel === board[i + 1][j + 2]
        ) {
          console.log([i, j], [i + 1, j + 2]);
          return true;
        }
        //For [x,?,X,x,]
        if (j > 1 && jewel === board[i][j - 2]) {
          console.log([i, j], [i, j + 1]);
          return true;
        }
        //For [X,x,?,x]
        if (j < board[i].length - 2 && jewel === board[i][j + 3]) {
          console.log([i, j], [i, j + 3]);
          return true;
        }
      }

      //For [X]
      //    [x]
      if (i < board.length - 1 && jewel === board[i + 1][j]) {
        //For [x,?,?]
        //    [?,X,?]
        //    [?,x,?]
        if (i > 0 && j > 0 && jewel === board[i - 1][j - 1]) {
          console.log([i, j], [i + 1, j]);
          return true;
        }
        //For [?,?,x]
        //    [?,X,?]
        //    [?,x,?]
        if (i > 0 && j < board[i].length - 1 && jewel === board[i - 1][j + 1]) {
          console.log([i, j], [i + 1, j]);
          return true;
        }
        //    [x]
        //For [?]
        //    [X]
        //    [x]
        if (i > 1 && jewel === board[i - 2][j]) {
          console.log("randal");
          console.log([i, j], [i + 1, j]);
          return true;
        }
        //For [?,X,?]
        //    [?,x,?]
        //    [x,?,?]
        if (i < board.length - 2 && j > 0 && jewel === board[i + 2][j - 1]) {
          console.log([i,j],[i+1,j]);
          return true;
        }
        //For [?,X,?]
        //    [?,x,?]
        //    [?,?,x]
        if (
          i < board.length - 2 &&
          j < board[i].length &&
          jewel === board[i + 2][j + 1]
        ) {
          console.log([i, j],[i + 2, j + 1]);
          return true;
        }
        //    [X]
        //For [x]
        //    [?]
        //    [x]
        if (i < board.length - 3 && jewel === board[i + 3][j]) {
          console.log([i,j],[i+1,j]);
          return true;
        }
      }
    }
  }
  return false;
};

export const computeNextMoves = (board) => {
  const output = [];
  let clone = getBoardClone(board);

  let hor = findHorizontalCombos(clone);
  let ver = findVerticalCombos(clone);
  let all = findCoordsOfMatches(hor, ver, clone);

  while (all.size > 0) {
    clone = clearCoords(all, clone);
    output.push([boardToString(clone), all.size]);
    clone = dropJewels(all, clone);
    output.push(boardToString(clone));
    clone = fillBoard(clone);
    output.push(boardToString(clone));
    hor = findHorizontalCombos(clone);
    ver = findVerticalCombos(clone);
    all = findCoordsOfMatches(hor, ver, clone);
  }

  return output;
};

export const boardToString = (board) => {
  let output = "";
  for (const row of board) {
    for (const jewel of row) {
      output += jewel === "white" ? 9 : colors.indexOf(jewel);
    }
  }
  return output;
};

export const stringToBoard = (str) => {
  const output = [[], [], [], [], [], [], [], []];

  for (let i = 0; i < str.length; i++) {
    output[Math.floor(i / 8)].push(
      Number(str[i]) === 9 ? "white" : colors[Number(str[i])]
    );
  }
  // console.log(output);
  return output;
};

export const clearBoard = (board) => {
  const clone = getBoardClone(board);

  for (const row of clone) {
    for (let i = 0; i < row.length; i++) {
      row[i]= 'white';
    }
  }
  
  return clone;
}

export const bazingaBoard = (board, initial = false) => {
  const clone = clearBoard(board);
  const output = [boardToString(clone)];
  const newBoard = initial !== false ? stringToBoard(initial) : generateRandomBoard();
  // console.log(initial);
  // console.log(stringToBoard(initial));

  while(newBoard.length > 0) {
    if (clone[0][0] === 'white' && clone[1][0] === 'white') {
      clone[0] = newBoard.pop();
      output.push(boardToString(clone));
    } else {
      for (let i = clone.length - 2; i >= 0; i--) {
        if (clone[i][0] !== 'white' && clone[i+1][0] === 'white') {
          clone[i+1] = clone[i].map(el => el);
          clone[i] = Array(8).fill('white');
        }
      }
      output.push(boardToString(clone));
      if (clone[1][0] !== 'white' && clone[2][0] !== 'white') {
        clone[0] = newBoard.pop();
        output.push(boardToString(clone));
      }
    }
  }

  return output;
}

export const deleteOptions = {
  method: "DELETE",
};

export const getPostOptions = (body) => ({
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const { ok, status, headers } = response;
    if (!ok)
      throw new Error(`Fetch failed with status - ${status}`, {
        cause: status,
      });

    const isJson = (headers.get("content-type") || "").includes(
      "application/json"
    );
    const responseData = await (isJson ? response.json() : response.text());

    return [responseData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};

export const getBearHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  };
}

export const formatNumString = (str) => {
  str = `${str}`;
  let output = '';
  for(let i = str.length-1, j = 0; i >= 0; i--) {
    output = str[i] + output;
    j++;
    if (j % 3 === 0 && i !== 0) {
      output = "," + output;
    }
  }
  return output;
}