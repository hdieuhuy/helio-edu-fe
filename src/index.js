/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import App from './App';
import DefaultLayout from './components/Layout';
import reportWebVitals from './reportWebVitals';
import { SocketProvider } from 'src/contexts/socket';

import './assets/fonts/index.scss';
import './assets/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <DefaultLayout>
        <SocketProvider>
          <App />
          <ToastContainer hideProgressBar autoClose={1500} theme="colored" />
        </SocketProvider>
      </DefaultLayout>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
