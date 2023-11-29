import React, { MouseEvent } from 'react';

import './style.css';

import { useAppDispatch } from '~/hooks';
import imgCross from './cross.svg';

// import { serialNumberRemoved } from '~/store/filters/analytics/dayly-reports';

interface Props {
  children: string;
  handleRemove: Function;
}

const SNBadge = (props: Props) => {
  const { children, handleRemove } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(handleRemove({ substring: children }));

  return (
    <div className="sn-badge">
      <span className="sn-badge__content">{children}</span>
      <img src={imgCross} alt="Удалить" onClick={handleClick} className="sn-badge__close-btn" />
      {/* <span className="sn-badge__close-btn" onClick={handleClick}></span> */}
    </div>
  );
}
 
export default SNBadge;