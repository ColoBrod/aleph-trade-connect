import React, { ReactNode, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ModalBox from '~/components/blocks/ModalBox';
import TopPanel from './TopPanel';
import LeftPanel from './LeftPanel';
import Calendar from '~/components/ui/Calendar';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { dateRangeSet } from '~/store/filters/analytics';
import { displaySet } from '~/store/ui/calendar';
import { fetchEntities } from '~/store/entities';

import './style.css';

const LayoutMain = () => {
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  // localStorage.setItem('location', location);

  const { status, error, data } = useAppSelector(state => state.entities);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchEntities())
  }, [status])

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
      <Calendar type='62-days' onChange={(id: string, date: Date) => {
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        dispatch(dateRangeSet({ id, date: `${mm}/${dd}/${yyyy}` }));
        dispatch(displaySet({ visible: false }));
      }} />
    </div>
  );
}

export default LayoutMain;