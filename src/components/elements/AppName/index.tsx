import React from 'react';

import './style.css'

interface Props {
  color: string;
}

const AppName = ({ color }: Props) => {
  color = color === "dark" ? "black" : "white";
  return (
    <div style={{ color }} className="app-name">AlephTradeConnect</div>
  );
}
 
export default AppName;