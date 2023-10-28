import React, { ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './style.css';

interface Props {
}

const modalBox = {
  "coffee-machine": <h1>Кофе-машина</h1>,
  "new-ticket": <h1>Новое обращение</h1>,
};
 
const ModalBox = (props: Props): ReactNode => {
  const [params, setParams] = useSearchParams();
  const page = params.get("modal-box");
  const display = page ? 'block' : 'none';
  // @ts-ignore
  const content = page ? modalBox[page] : null;

  return (
    <div style={{ display }} className='modal-box'>
      <div className="modal-box__top-panel">
        <div className="modal-box__title">{content}</div>
        <div onClick={handleClick} className="modal-box__close-btn">X</div>
      </div>
      <div className="modal-box__content-area">
        Далеко-далеко за словесными, горами в стране гласных и согласных живут рыбные тексты. Бросил заглавных свой предложения вопрос сбить маленькая ipsum, переписали грустный вдали составитель великий. Ведущими предупреждал пор, деревни дороге ipsum назад.
      </div>
    </div>
  );

  function handleClick() {
    
  }

}
 
export default ModalBox;