import React from 'react';
import './style.css';

interface Props {
  children: string;
}

const Button = (props: Props) => {
  const { children } = props;
  return (
    <div className='component-btn'>
      { children }
    </div>
  );
}
 
export default Button;