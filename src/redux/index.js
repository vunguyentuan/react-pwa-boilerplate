import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'seamless-immutable'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export const configureStore = (initialState, reducer = rootReducer) => {
  const middlewares = [thunk]

  if (process.env.NODE_ENV === 'development') {
    const reduxLogger = require('redux-logger')

    const logger = reduxLogger.createLogger({
      collapsed: true,
    })

    middlewares.push(logger)
  }

  const enhancers = [applyMiddleware(...middlewares)]

  // convert plain object to immutable
  const immutaleState = initialState
    ? Object.keys(initialState).reduce((finalState, key) => {
        finalState[key] = Immutable.from(initialState[key])
        return finalState
      }, {})
    : undefined

  return createStore(reducer, immutaleState, compose(...enhancers))
}
