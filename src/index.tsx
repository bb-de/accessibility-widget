// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import AccessibilityWidget from './AccessibilityWidget';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccessibilityWidget />
  </React.StrictMode>
);
