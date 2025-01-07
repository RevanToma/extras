import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    				<Theme>
    <App />
    </Theme>
  </React.StrictMode>
);

