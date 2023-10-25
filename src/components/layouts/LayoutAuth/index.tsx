import React from 'react';

import './style.css';
import { Outlet } from 'react-router-dom';

// import imgBg from './img/bg.jpg';

const LayoutAuth = () => {
  return (
    <div className="layout layout-auth">
      <div className="layout-auth__left">
      </div>
      <div className="layout-auth__right">
        <Outlet />
      </div>
    </div>
  );
}
 
export default LayoutAuth;