// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the main App component
import './css/styles.css'; // Import global styles

// Render the App component into the root DOM element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);