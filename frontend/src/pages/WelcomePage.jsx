import React from 'react';
import { NavLink } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <main>
      <NavLink to={'/game'}>Play game</NavLink>
    </main>
  );
}

export default WelcomePage;
