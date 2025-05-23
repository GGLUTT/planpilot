import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import WebApp from '@twa-dev/sdk';

// Initialize WebApp
try {
  WebApp.ready();
} catch (error) {
  console.warn('WebApp initialization failed:', error);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
