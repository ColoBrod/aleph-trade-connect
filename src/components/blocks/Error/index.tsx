import React from 'react';
import './style.css';

interface Props {
  message: string;
}

const Error = (props: Props) => {
  const { message } = props;
  return (
    <div className="info-block-error">
      <div className="info-block-error__header">Ошибка</div>
      <div className="info-block-error__message">
        {message}
      </div>
    </div>
  );
}
 
export default Error;