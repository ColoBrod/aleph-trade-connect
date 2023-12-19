import React, { MouseEventHandler, ReactNode } from 'react';
import './style.css';

interface Props {
  children: ReactNode;
  layout?: "light" | "dark" | "dark-shadow";
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Button = (props: Props) => {
  const { children, layout = "light", onClick, disabled = false } = props;
  return (
    <div className={`btn btn-${layout} ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      { children }
    </div>
  );
}
 
export default Button;