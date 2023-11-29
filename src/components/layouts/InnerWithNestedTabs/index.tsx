import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Tabs from '~/components/blocks/Tabs';

interface Props {
  tabs: { children: string; path: string; }[]
}

const InnerWithNestedTabs = (props: Props) => {
  const { pathname } = useLocation();
  const colors = pathname.includes('/maintenance/monitoring')
    ? 'monitoring'
    : 'default'
  return (
    <>
      <Tabs items={props.tabs} layout="bottom" colors={colors} />
      <div className="layout-main__content-area">
        <Outlet />
      </div>
    </>
  );
}

export default InnerWithNestedTabs;