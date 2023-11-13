import React, { MouseEvent } from 'react';

import './style.css';

import { useAppDispatch } from '~/hooks';
import { serialNumberRemoved } from '~/store/filters';

interface Props {
  children: string;
}

const SNBadge = (props: Props) => {
  const { children } = props;
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(serialNumberRemoved({ substring: children }));

  return (
    <div className="sn-badge">
      <span className="sn-badge__content">{children}</span>
      <span className="sn-badge__close-btn" onClick={handleClick}>X</span>
    </div>
  );
}
 
export default SNBadge;