import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
const Home = ({ increase, counter }) => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>

      <button onClick={event => increase()}>Counter {counter}</button>
      <NavLink to="/about">About</NavLink>
    </div>
  );
};

export default connect(
  state => {
    return {
      counter: state.user.counter,
    };
  },
  dispatch => {
    return {
      increase: data =>
        dispatch({
          type: 'INCREASE_COUNTER',
        }),
    };
  }
)(Home);
