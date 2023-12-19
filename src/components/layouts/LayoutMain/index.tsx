import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ModalBox from '~/components/blocks/ModalBox';
import TopPanel from './TopPanel';
import LeftPanel from './LeftPanel';

import { useAppDispatch, useAppSelector } from '~/hooks';
// import { dateRangeSet } from '~/store/filters/analytics';
import { fetchEntities } from '~/store/entities';

import './style.css';
import Tooltip from '~/components/ui/Tooltip';

const LayoutMain = () => {
  const dispatch = useAppDispatch();

  const { status, error, data } = useAppSelector(state => state.entities);

  /**
   * Редирект на страницу авторизации, если нету токена
   */
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/auth/login" replace={true} />

  useEffect(() => {
    if (status === 'idle') dispatch(fetchEntities())
  }, [status])

  return (
    <div className="layout layout-main">
      <TopPanel />
      <LeftPanel />
      <div className="layout-main__inner">
        <Outlet />
        <ModalBox> 
          {/* { modalBox[modalBoxPageName] } */}
        </ModalBox>
      </div>
      
      <Tooltip />
    </div>
  );
}

export default LayoutMain;