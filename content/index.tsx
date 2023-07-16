import React from 'react';
import { FinProvider } from '@actav/floating-icon-navigation';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.createElement('div');
rootElement.id = 'netflowsing';
document.body.appendChild(rootElement);

chrome.runtime.sendMessage({ message: 'clicked' });

chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === 'Hello') {
    console.log('my logic');
  }
});

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <FinProvider>
      <App />
    </FinProvider>
  </React.StrictMode>,
);
