import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from './redux'
import App from './components/App'
import WithStylesContext from './helpers/WithStylesContext'

const store = configureStore()
const identity = styles => styles

const Bootstrap = () => {
  return (
    <WithStylesContext onInsertCss={identity}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </WithStylesContext>
  )
}

export default Bootstrap