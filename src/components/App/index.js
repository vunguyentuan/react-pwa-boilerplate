import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';
import { Route, Switch } from 'react-router';
import routes from '../../routes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Switch>
          {routes.map((route, index) => <Route key={index} {...route} />)}
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);
