import React from 'react';

import './style.css';
import { ErrorType as EventType } from '~/services/errors';


interface Props {
  id: string | number;
  checked: boolean | 0 | 1 | 2;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color?: 'default' | EventType;
}

const mapIntToStyle = {
  0: 'unchecked',
  1: 'checked',
  2: 'half-checked',
}

const Checkbox = (props: Props) => {
  let { id, checked, color } = props;
  let style = "";
  const { label, onChange: handleClick } = props;
  if (typeof id === 'number') id = id.toString();
  if (typeof checked !== 'boolean') style = mapIntToStyle[checked];
  else style = checked === true ? 'checked' : 'unchecked';
  checked = checked ? true : false;

  return (
    <div className={`component-checkbox ${style} checkbox-id-${id} color-${color}`}>
      <input onChange={handleClick} type="checkbox" id={id} name={id} checked={checked}  />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
 
export default Checkbox;