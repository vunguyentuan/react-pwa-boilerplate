import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from './redux'
import App from './components/App'
import WithStylesContext from './helpers/WithStylesContext'
// import registerServiceWorker from './registerServiceWorker'
// import './styles/index.css'

const store = configureStore()

const Bootstrap = () => {
  return (
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
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
