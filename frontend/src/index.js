import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css/animate.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AuthProvider store={createStore({
          authName:'_auth',
          authType:'cookie',
          cookieDomain: window.location.hostname,
          cookieSecure: false,
      })}>
          <App/>
      </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
