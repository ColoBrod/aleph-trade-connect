import React, { MouseEventHandler, ReactNode } from 'react';
import './style.css';

interface Props {
  children: ReactNode;
  layout?: "light" | "dark" | "dark-shadow";
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const Button = (props: Props) => {
  const { children, layout = "light", onClick, disabled = false, className = "" } = props;
  return (
    <div 
      className={`btn btn-${layout} ${disabled ? 'disabled' : ''} ${className}`} 
      onClick={(e) => {
        if (!disabled) onClick(e);
      }}
    >
      { children }
    </div>
  );
}
 
export default Button;
