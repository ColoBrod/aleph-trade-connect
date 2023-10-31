import React, { ReactNode } from 'react';

import './style.css';



interface Props {
  layout: "chart" | "chart-2" | "chart-3" | "chart-solo" | "grid-2x2";
  divider?: boolean;
  header?: string;
  children: ReactNode
}

/**
 * @param {Props} props
 *  layout:
 *    chart       - 2 виджета справа
 *    chart-2     - 1 виджет сверху
 *    chart-3     - 2 виджета сверху
 *    chart-solo  - чарт занимает все пространство
 *    grid-2x2    - 4 виджета
 */
const InfoBlock = (props: Props): ReactNode => {
  const { layout, header, children: content } = props;

  return (
    <div className={`info-block layout-${layout}`}>
      <div className="info-block__header">{header}</div>
      <div className="info-block__content">
        {content}
      </div>
    </div>
  );
  
}
 
export default InfoBlock;