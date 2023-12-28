import React, { ChangeEventHandler, useRef } from 'react';
import './style.css';

interface Props {
  name: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  mode?: "" | "error" | "message";
  layout?: 'form';
}

const TextArea = ({
  name, 
  value = "", 
  placeholder = "", 
  label = "", 
  disabled = false, 
  onChange: handleChange,
  layout = 'form',
}: Props) => {

  const ref = useRef(null);

  return (
    <div className={`text-area text-area_${layout}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        ref={ref}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ? placeholder : ""}
        disabled={disabled}
        />

    </div>
  );
}

export default TextArea;
