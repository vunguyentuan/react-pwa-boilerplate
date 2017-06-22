import React from 'react';
import { NavLink } from 'react-router-dom'
const Home = () => {
  return (
    <div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>

      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default Home;