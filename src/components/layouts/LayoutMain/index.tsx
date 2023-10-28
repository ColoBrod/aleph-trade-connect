import React, { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Tabs from '~/components/blocks/Tabs';
import ModalBox from '~/components/blocks/ModalBox';
import TopPanel from './TopPanel';
import LeftPanel from './LeftPanel';

import './style.css';



const LayoutMain = () => {
  const location = useLocation().pathname;
  localStorage.setItem('location', location);

  return (
    <div className="layout layout-main">
      <TopPanel />
      <LeftPanel />
      <div className="layout-main__inner">
        <Outlet />
      </div>
      { 
        <ModalBox> 
          {/* { modalBox[modalBoxPageName] } */}
        </ModalBox>
      }
    </div>
  );
}
 
export default LayoutMain;