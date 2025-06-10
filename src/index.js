// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

// ← 新增這行，確保 Tailwind utilities 被載入
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);