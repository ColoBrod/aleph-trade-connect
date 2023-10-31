import React, { ReactNode } from 'react';

import './style.css';

interface Props {
  icon?: string;
  amount: number | string;
  description: ReactNode;
  layout?: "chart" | "chart-icon" | "header" | "dashboard";
  align?: "left" | "center" | "right";
  toFixed?: boolean;
}

const Widget = (props: Props) => {
  const { layout = "chart", align = "center", amount, description, toFixed, icon } = props;
  return (
    <div className={`widget widget-${layout} ${align}`}>
      { 
        icon ? <img className="widget__icon" src={icon} alt="" /> : null 
      }
      <div className="widget__amount">
        { toFixed && typeof amount === 'number' ? amount.toFixed(2) : amount}
      </div>
      <div className="widget__description">{description}</div>
    </div>
  );
}
 
export default Widget;