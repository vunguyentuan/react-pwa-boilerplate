import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

export const configureStore = (initialState, reducer = rootReducer) => {
  const middlewares = [thunk]

  if (process.env.NODE_ENV === 'development') {
    const reduxLogger = require('redux-logger')

    const logger = reduxLogger.createLogger({
      collapsed: true
    })

    middlewares.push(logger)
  }

  return applyMiddleware(...middlewares)(createStore)(reducer, initialState)
}