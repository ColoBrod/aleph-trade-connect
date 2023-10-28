import React, { ReactNode } from 'react';

import './style.css';

interface Props {
  layout?: "chart";
  divider?: boolean;
  header?: string;
  children: ReactNode
}

const InfoBlock = (props: Props): ReactNode => {
  const { layout, header, children: content } = props;

  switch (layout) {
    case "chart": return (
      <div className="info-block">
        <div className="info-block__header">{header}</div>
        <div className="info-block__content">
          {content}
        </div>
      </div>
    );
    default: return null;
  }
  
}
 
export default InfoBlock;