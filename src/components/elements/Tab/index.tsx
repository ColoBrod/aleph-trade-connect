import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

export interface Props {
  children: string;
  path: string;
  layout?: 'top' | 'bottom';
}

const Tab = (props: Props) => {
  const { children, layout, path } = props;
  return (
    <NavLink className={`tab tab-${layout}`} to={path}>{children}</NavLink>
  );
}
 
export default Tab;