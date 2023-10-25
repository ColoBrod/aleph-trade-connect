import React from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import Tabs from '~/components/blocks/Tabs';

interface Props {
}


const Analytics = (props: Props) => {

  const tabs = [
    { children: "Trends", path: `/analytics/trends` },
    { children: "Dayly Reports", path: `/analytics/dayly-reports` },
    { children: "Data Export", path: `/analytics/data-export` },
  ];

  return (
    <>
      <Tabs layout="top" items={tabs} />
      <Outlet />
    </>
  );
}
 
export default Analytics;