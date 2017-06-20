import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { configureStore } from './redux'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';

const store = configureStore()

const Bootstrap = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
registerServiceWorker();
