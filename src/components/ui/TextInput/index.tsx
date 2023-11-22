import React, { ChangeEventHandler, useRef } from 'react';

import "./style.css";
import imgShowPassword from './show-password.svg'

interface Props {
  type?: 'password' | 'text';
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const TextInput = (props: Props) => {
  const { 
    type = 'text',
    name, 
    value = "", 
    label = "", 
    placeholder = "",
    onChange: handleChange,
  } = props;
  const ref = useRef();

  return (
    <div className="input-text">
      {label && <label htmlFor={name}>{label}</label>}
      <input 
        ref={ref}
        type={type}
        id={name} 
        name={name} 
        value={value}
        onChange={handleChange}
        placeholder={ placeholder ? placeholder : "" } 
        />
      {
        type === 'password' 
          ? <img 
              className='icon-show-password' 
              onClick={e => {

              }}
              src={imgShowPassword} 
              alt="" 
            />
          : null
      }
    </div>
  );
}
 
export default TextInput;