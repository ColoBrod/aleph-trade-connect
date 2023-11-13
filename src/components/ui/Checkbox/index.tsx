import React from 'react';

import './style.css';

interface Props {
  id: string;
  checked: boolean;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const Checkbox = (props: Props) => {
  const { id, checked, label, onClick: handleClick } = props;
  // checked={checked}
  // handleClick
  return (
    <div className='component-checkbox'>
      <input onClick={handleClick} type="checkbox" id={id} name={id}  />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
 
export default Checkbox;