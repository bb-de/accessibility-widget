import './asset/style/widget-styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import AccessibilityWidget from './AccessibilityWidget';

ReactDOM.createRoot(document.getElementById('accessibility-widget-root')!).render(
  <React.StrictMode>
    <AccessibilityWidget />
  </React.StrictMode>
);
