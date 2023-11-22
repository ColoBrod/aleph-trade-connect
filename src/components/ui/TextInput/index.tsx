import React, { ChangeEventHandler, useRef, useState } from 'react';

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
    type: typeProp = 'text',
    name, 
    value = "", 
    label = "", 
    placeholder = "",
    onChange: handleChange,
  } = props;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const type = typeProp === 'text'
    ? 'text'
    : visible === true
      ? 'text'
      : 'password';

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
        typeProp === 'password' 
          ? <img 
              className='icon-show-password' 
              onClick={e => setVisible(!visible)}
              src={imgShowPassword} 
              alt="Icon - show password" 
            />
          : null
      }
    </div>
  );
}
 
export default TextInput;