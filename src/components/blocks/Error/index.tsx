import React from 'react';
import './style.css';

interface Props {
  message: string;
}

const Error = (props: Props) => {
  const { message } = props;
  return (
    <div className="error">
      <div className="error__header">Ошибка</div>
      <div className="error__message">
        {message}
      </div>
    </div>
  );
}
 
export default Error;