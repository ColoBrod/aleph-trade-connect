import React, { ReactNode } from 'react';

import './style.css';

// TODO: 
// Здесь есть лейауты, которые делают одно и то же. Кроме того, есть проблемы с
// неймингом. Необходимо нормально переименовать.
interface Props {
  layout: "single-item"
    | 'info'
    | "chart" 
    | "chart-timerange"
    | "chart-2" // TODO: deprecated
    | "chart-3" // TODO: deprecated
    | "chart-4" 
    | "chart-5" 
    | "chart-6" 
    | "chart-7" 
    | "chart-solo" 
    | "grid-2x2";
    // | "chart-doughnut-small";
  divider?: boolean;
  header?: string;
  className?: string;
  children: ReactNode
}

/**
 * @param {Props} props
 *  layout:
 *    chart       - 2 виджета справа
 *    chart-2     - 1 виджет сверху
 *    chart-3     - 2 виджета сверху
 *    chart-4     - 1 виджет снизу
 *    chart-solo  - чарт занимает все пространство
 *    grid-2x2    - 4 виджета
 */
const InfoBlock = (props: Props): ReactNode => {
  const { layout, header, children: content, className } = props;

  return (
    <div className={`info-block layout-${layout} ${className ? className : ''}`}>
      <div className="info-block__header">{header}</div>
      <div className="info-block__content">
        {content}
      </div>
    </div>
  );
  
}
 
export default InfoBlock;