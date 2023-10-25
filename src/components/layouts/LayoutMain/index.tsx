import React, { ReactNode } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Tabs from '~/components/blocks/Tabs';
import ModalBox from '~/components/blocks/ModalBox';
import TopPanel from './TopPanel';
import LeftPanel from './LeftPanel';

import './style.css';

const modalBox = {
  "coffee-machine": <h1>Кофе-машина</h1>,
  "coffee": <h1>Кофе-машина</h1>,
};

const LayoutMain = () => {
  const location = useLocation().pathname;
  const [params, setParams] = useSearchParams();
  const modalBoxPageName = params.get("page");
  const modalBoxDisplay = 
    params.get("display-modal-box") === "true" && 
    modalBoxPageName && 
    modalBoxPageName in Object.keys(modalBox);
  localStorage.setItem('location', location);

  return (
    <div className="layout layout-main">
      <TopPanel />
      <LeftPanel />
      <div className="layout-main__inner">
        <Outlet />
      </div>
      { 
        modalBoxDisplay && <ModalBox> 
          {/* { modalBox[modalBoxPageName] } */}
        </ModalBox>
      }
    </div>
  );
}
 
export default LayoutMain;