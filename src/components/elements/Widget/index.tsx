import React from 'react';

import './style.css';

interface Props {
  icon?: string;
  amount: number;
  description: string;
  layout: "chart" | "header";
}

const Widget = (props: Props) => {
  const { layout } = props;
  return (
    <div className={`widget widget-${layout}`}>
      <div className="widget__icon"></div>
      <div className="widget__amount"></div>
      <div className="widget__description"></div>
    </div>
  );
}
 
export default Widget;