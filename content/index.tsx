import React from 'react';
import Provider from './provider/Provider';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.createElement('div');
rootElement.id = 'netflowsing';
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
);
