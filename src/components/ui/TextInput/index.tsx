import React, { ChangeEventHandler, useRef, useState } from 'react';

import "./style.css";
import imgShowPassword from './show-password.svg';
import imgSearch from './search.svg';
import InputMask from 'react-input-mask'; 

interface Props {
  type?: 'password' | 'text';
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  modi?: "" | "error" | "message";
  mask?: string;
  isSearch?: boolean;
  layout?: 'default' | 'form';
}

const TextInput = (props: Props) => {
  const { 
    type: typeProp = 'text',
    name, 
    value = "", 
    label = "", 
    placeholder = "",
    onChange: handleChange,
    modi = "",
    disabled = false,
    mask = "",
    isSearch = false,
    layout = 'default',
  } = props;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const type = typeProp === 'text'
    ? 'text'
    : visible === true
      ? 'text'
      : 'password';

  return (
    <div className={`input-text input-text_layout-${layout}  ${modi} ${isSearch ? 'search' : ''}`}>
      {label && <label htmlFor={name}>{label}</label>}
      {
        mask !== "" 
          ? <InputMask
              mask={mask}
              maskChar="_"
              ref={ref}
              type={type}
              id={name} 
              name={name} 
              value={value}
              onChange={handleChange}
              placeholder={ placeholder ? placeholder : "" } 
              disabled={disabled}
              />
          : <input 
              ref={ref}
              type={type}
              id={name} 
              name={name} 
              value={value}
              onChange={handleChange}
              placeholder={ placeholder ? placeholder : "" } 
              disabled={disabled}
              />
      }
        
      {
        typeProp === 'password' 
          ? <img 
              className={`icon-show-password`}
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
