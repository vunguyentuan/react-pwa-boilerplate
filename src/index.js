import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from './redux'
import App from './components/App'
import WithStylesContext from './helpers/WithStylesContext'
// import registerServiceWorker from './registerServiceWorker'

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

ReactDOM.render(<Bootstrap />, document.getElementById('root'))
// registerServiceWorker()
