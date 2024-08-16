import React, { useEffect, useState } from 'react';
import {fetchHandler, formatNumString} from "../utils";

const HighScoresPage = () => {
  const [scores,setScores] = useState([]);
  useEffect(() => {
    const getScores = async () => {
      const [data,error] = await fetchHandler("/api/users/highScores");
      const arr = [];
      for (const i in data) {
        arr.push([i,data[i]]);
      }
      arr.sort((a,b) => a[1] + b[1]);
      setScores(arr);
    };
    getScores();
  },[])
  return (
    <main>
      <ul>
      {scores.map((el,i) => <h2 key={i}>{`${el[0]}: ${formatNumString(el[1])}`}</h2>)}
      </ul>
    </main>
  );
}

export default HighScoresPage;
