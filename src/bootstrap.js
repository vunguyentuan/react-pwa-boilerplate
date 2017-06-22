import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from './redux'
import App from './components/App'
import WithContext from './helpers/WithContext'

const store = configureStore(window.__INITIAL_STATE__)
const identity = data => data

const Bootstrap = () => {
  return (
    <WithContext onInsertCss={identity} onAddLoader={identity}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </WithContext>
  )
}

export default Bootstrap
