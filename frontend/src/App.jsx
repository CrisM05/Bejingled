import React, { useContext, useState } from 'react';
import Board from './components/Board';
import NavBar from './components/NavBar';
import boardContext from './contexts/BoardContext';

const App = () => {
  const [length, setLength] = useState(8);
  const [height, setHeight] = useState(8);
  const {yippie} = useContext(boardContext);
  
  return (
    <>
    <NavBar />
    {yippie && <h1>BAZINGA</h1>}
    <main>
      <div id='board-wrapper'>
      {/* <input type="number" name="" id="" value={length} onChange={(e) => setLength(e.target.value)}/>
      <input type="number" name="" id="" value={height} onChange={(e) => setHeight(e.target.value)}/> */}
      <Board length={length} height={height}/>
      </div>
    </main>
    </>
  );
}

export default App;
