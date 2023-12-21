import React from 'react';
import { ErrorType as ErrorClass } from '~/services/errors';

interface Props {
  onClick: Function;
  active: boolean;
  errClass: ErrorClass | "unknown";
  children: string;
}

const ErrorButton = ({onClick: handleClick, active, errClass, children: code}: Props) => {

  return (
    <div 
      className={`error-button error-button-${errClass} ${active ? 'active' : ''}`}
      onClick={handleClick}
      >
      {code}
    </div>
  )
}

export default ErrorButton;