import React, { useState } from 'react';
import imgCloseBtn from './close-btn.svg';
import './style.css';
import { useAppDispatch, useAppSelector } from '~/hooks';
import TextInput from '~/components/ui/TextInput';
import Button from '~/components/ui/Button';
import { modalBoxToggled } from '~/store/pages/administration/company-structure';

const ModalBoxUsers = () => {
  const dispatch = useAppDispatch();
  const { isVisible } = useAppSelector(
    state => state.pages.administration.companyStructure.modalBox
  );
  const [users, setUsers] = useState("");


  const closeBtn = (
    <img 
      src={imgCloseBtn} 
      onClick={e => dispatch(modalBoxToggled(false))}
      className='modal-box-users__close-btn'
      alt="Закрыть модальное окно с пользователями" />
  );

  const handleSearch = (e: React.ChangeEvent) => {
    const { value } = e.currentTarget;
    setUsers(value);
  }

  return(
    <div className={`modal-box-users modal-box-users_${isVisible ? 'visible' : 'hidden'}`}>
      <div className={`modal-box-users__inner`}>
        {closeBtn}
  
        <div className="modal-box-users__header">
          Все пользователи
        </div>
        <TextInput 
          isSearch={true} 
          type='text'
          key='users'
          name='users'
          placeholder='Поиск' 
          value={users}
          onChange={handleSearch} 
        />
        <Button>Создать нового пользователя</Button>
        <div className="modal-box-users__list">
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
          <div className="modal-box-users__user">
            <span>Иван</span>
            <span>+7 (968) 511-58-71</span>
          </div>
        </div>
        
        <div className="modal-box-users__buttons">
          <Button>Добавить</Button>
          <Button>Отмена</Button>
        </div>


      </div>
    </div>
  );
}

export default ModalBoxUsers;
