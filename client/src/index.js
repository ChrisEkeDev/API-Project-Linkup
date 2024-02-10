import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './context/AppContext'
import './index.css';
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as authActions from "./store/auth";
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.authActions = authActions;
}


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
        <BrowserRouter>
          <AppProvider>
            <App />
          </AppProvider>
        </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
