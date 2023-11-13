import React, { ReactNode } from 'react';
import './style.css';

interface Props {
  children: ReactNode;
  layout?: "light";
  onClick?: () => void;
}

const Button = (props: Props) => {
  const { children, layout = "light", onClick } = props;
  return (
    <div className={`btn btn-${layout}`} onClick={onClick}>
      { children }
    </div>
  );
}
 
export default Button;