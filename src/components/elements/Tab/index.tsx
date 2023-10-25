import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

export interface Props {
  children: string;
  path: string;
}

const Tab = (props: Props) => {
  const { children, path } = props;
  return (
    <NavLink className="tab" to={path}>{children}</NavLink>
  );
}
 
export default Tab;