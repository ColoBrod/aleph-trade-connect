import React from 'react';

import './style.css';

interface Props {
  id: string;
  checked: boolean;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: Props) => {
  const { id, checked, label, onChange: handleClick } = props;
  // checked={checked}
  // handleClick
  // defaultChecked={checked}
  return (
    <div className='component-checkbox'>
      <input onChange={handleClick} type="checkbox" id={id} name={id} checked={checked}  />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
 
export default Checkbox;