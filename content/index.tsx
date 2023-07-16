import React from 'react';
import { FinProvider } from '@actav/floating-icon-navigation';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CONNECTION, _CONNECTION } from '~channel';

const rootElement = document.createElement('div');
rootElement.id = 'netflowsing';
document.body.appendChild(rootElement);

chrome.runtime.sendMessage({ message: CONNECTION });
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === _CONNECTION) {
    console.log('Successfully connected with background script');
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
