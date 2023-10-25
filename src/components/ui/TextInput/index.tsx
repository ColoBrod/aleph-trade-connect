import React from 'react';

import "./style.css";

interface Props {
  placeholder?: string;
}

const TextInput = (props: Props) => {
  const { placeholder } = props;
  return (
    <input type="text" placeholder={ placeholder ? placeholder : "" } />
  );
}
 
export default TextInput;