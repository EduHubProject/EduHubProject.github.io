import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css'
import MainApp from './App.jsx'
import { Workbox } from 'workbox-window'
import './i18n'

// Убедитесь, что React импортирован глобально
window.React = React;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
)