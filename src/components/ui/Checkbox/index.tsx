import React from 'react';

import './style.css';

interface Props {
  id: string;
  checked: boolean;
  label: string;
}

const Checkbox = (props: Props) => {
  const { id, checked, label } = props;
  return (
    <div className='component-checkbox'>
      <input type="checkbox" id={id} name={id} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
 
export default Checkbox;