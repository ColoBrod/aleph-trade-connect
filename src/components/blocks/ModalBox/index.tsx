import React, { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './style.css';

interface Props {
  children: ReactNode;
}
 
const ModalBox = (props: Props): ReactNode => {
  return (
    <div className='modal-box'>
      {props.children}
    </div>
  );
}
 
export default ModalBox;