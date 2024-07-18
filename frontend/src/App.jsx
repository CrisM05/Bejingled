import React, { useState } from 'react';
import Board from './components/Board';

const App = () => {
  const [length, setLength] = useState(8);
  const [height, setHeight] = useState(8);
  return (
    <main>
      <div id='board-wrapper'>
      {/* <input type="number" name="" id="" value={length} onChange={(e) => setLength(e.target.value)}/>
      <input type="number" name="" id="" value={height} onChange={(e) => setHeight(e.target.value)}/> */}
      <Board length={length} height={height}/>
      </div>
    </main>
  );
}

export default App;
