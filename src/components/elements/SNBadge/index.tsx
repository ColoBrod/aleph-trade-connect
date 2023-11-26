import React, { MouseEvent } from 'react';

import './style.css';

import { useAppDispatch } from '~/hooks';
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
      <span className="sn-badge__close-btn" onClick={handleClick}>X</span>
    </div>
  );
}
 
export default SNBadge;