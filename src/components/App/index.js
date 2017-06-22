import React, { Component } from 'react'
import logo from './logo.svg'
import styles from './App.css'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router'
import Home from '../Home'
import About from '../About'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Welcome to React</title>
        </Helmet>
        <div className={styles.AppHeader}>
          <img src={logo} className={styles.AppLogo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Route path='/' exact component={Home}/>
        <Route path='/about' exact component={About}/>
      </div>
    )
  }
}

export default withStyles(styles)(App)
