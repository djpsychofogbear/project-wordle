import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

import './reset.css';
import './styles.css';

const rootElement = document.querySelector('#root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(<App />); 