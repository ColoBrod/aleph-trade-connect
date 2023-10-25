import React from 'react';
import { Outlet } from 'react-router-dom';
import Tabs from '~/components/blocks/Tabs';

interface Props {
  tabs: { children: string; path: string; }[]
}

const InnerWithNestedTabs = (props: Props) => {
  return (
    <>
      <div className="layout-main__content-area">
        <Outlet />
      </div>
      <Tabs items={props.tabs} layout="bottom" />
    </>
  );
}

export default InnerWithNestedTabs;