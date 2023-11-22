import React from 'react';

import './style.css';
import { Outlet } from 'react-router-dom';
import AppName from '~/components/elements/AppName';
import Logo from '~/components/elements/Logo';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { displaySet } from '~/store/pages/auth';

// import imgBg from './img/bg.jpg';

const LayoutAuth = () => {

  const dispatch = useAppDispatch()
  const { display } = useAppSelector(state => state.pages.auth);

  return (
    <div className="layout layout-auth">
      {
        display === 'logo' && 
        <div 
          className="layout-auth__logo" 
          onClick={() => {
            dispatch(displaySet('login'))
          }}
        >
          <Logo fixed={false} active={false} />
          <AppName layout='main' />
        </div>
      }
      {
        display === 'login' && <div className="layout-auth__inner">
          <Outlet />
        </div>
      }
    </div>
  );
}
 
export default LayoutAuth;