import React from 'react';
import ReactDOM from 'react-dom/client';
import AccessibilityWidget from './AccessibilityWidget';

const container = document.createElement('div');
container.id = 'a11y-widget-container';
document.body.appendChild(container);

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <AccessibilityWidget />
  </React.StrictMode>
);
