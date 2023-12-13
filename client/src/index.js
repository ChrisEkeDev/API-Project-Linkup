import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store'
import { Provider } from 'react-redux';
import AppProvider from './context/AppContext'
import './index.css';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as authActions from "./store/auth";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.authActions = authActions;
}


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
