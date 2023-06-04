import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store'
import AlertsProvider from './context/AlertsProvider';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


function Root() {
  return (
    <Provider store={store}>
      <AlertsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AlertsProvider>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);
