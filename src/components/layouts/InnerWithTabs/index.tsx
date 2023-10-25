import React from 'react';
import { Outlet } from 'react-router-dom';
import Tabs from '~/components/blocks/Tabs';

interface Props {
  tabs: { children: string; path: string; }[]
}

const InnerWithTabs = (props: Props) => {
  return (
    <>
      <Tabs items={props.tabs} layout="top" />
      <Outlet />
    </>
  );
}

export default InnerWithTabs;