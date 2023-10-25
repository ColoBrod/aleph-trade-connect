import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider } from 'react-router-dom';

// Styles
import '@style/normalize.css';
import '@style/index.css';
import '@style/adaptiveness.css'
import '@style/adaptiveness-debug.css'

// Components
import router from './routes';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  // const element = React.createElement(App, {}, null);
  root.render(<RouterProvider router={router} />);
}
