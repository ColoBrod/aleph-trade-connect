import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Styles
import '@style/normalize.css';
import '@style/index.css';
import '@style/inputs.css';
import '@style/adaptiveness.css';
import '@style/adaptiveness-debug.css';
import '@style/scroll-bar.css';
import '@style/pages.css';

// 

// Components
import router from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

// Редирект на сохраненную страницу. Отключить, когда буду делать страницу 
// авторизации
// const savedLocation = localStorage.getItem('location');
// const currentLocation = window.location.pathname;
// console.log("Saved:", savedLocation);
// console.log("Current:", currentLocation);
// if (savedLocation && savedLocation !== currentLocation) 
//   window.location.href = savedLocation;
// if (savedLocation) window.location.href = savedLocation;

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  // const element = React.createElement(App, {}, null);
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider >
  );
}
