import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContent from './context/firebase';
import { firebase } from './lib/firebase';
import './index.css';

ReactDOM.render(
  <FirebaseContent.Provider value={{ firebase }} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContent.Provider>,
  document.getElementById('root')
);


