import React from 'react';

import './style.css'
// import { use_XS, use_SM, use_MD, use_LG, use_XL } from '~/media-queries';
interface Props {
  color: string;
}

const AppName = ({ color }: Props) => {
  color = color === "dark" ? "black" : "white";
  // const xs = use_XS();
  // const sm = use_SM();
  // const md = use_MD();
  // const lg = use_LG();
  // const xl = use_XL();
  return (
    <div style={{ color }} className="app-name">
      AlephTradeConnect
    </div>
  );
}
 
export default AppName;