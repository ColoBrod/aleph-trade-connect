import React, { ChangeEvent, useState } from 'react';
import imgCloseBtn from './close-btn.svg';
import imgBack from './back.svg';
import './style.css';
import { useAppDispatch, useAppSelector } from '~/hooks';
import TextInput from '~/components/ui/TextInput';
import Button from '~/components/ui/Button';
import { modalBoxPageSet, modalBoxToggled } from '~/store/pages/administration/company-structure';

const ModalBoxUsers = () => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useAppDispatch();
  const { isVisible, page, users } = useAppSelector(
    state => state.pages.administration.companyStructure.modalBox
  );
  const [search, setSearch] = useState("");
  // const 

  const closeBtn = (
    <img 
      src={imgCloseBtn} 
      onClick={e => dispatch(modalBoxToggled(false))}
      className='modal-box-users__close-btn'
      alt="Закрыть модальное окно с пользователями" 
      />
  );

  const backBtn = (
    <img 
      src={imgBack}
      onClick={e => dispatch(modalBoxPageSet("all-users"))}
      className='modal-box-users__back-btn'
      alt="Назад" 
      />
  )

  const handleSearch = (e: ChangeEvent) => {
    // @ts-ignore
    const { value } = e.currentTarget;
    setSearch(value);
  }

  const pageAllUsers = (
    <div className={`modal-box-users__inner modal-box-users__page-all-users`}>
      {closeBtn}
      <div className="modal-box-users__header">
        Все пользователи
      </div>
      <TextInput 
        isSearch={true} 
        type='text'
        key='search'
        name='search'
        placeholder='Поиск' 
        value={search}
        onChange={handleSearch} 
      />
      <Button onClick={e => dispatch(modalBoxPageSet('add-user'))}>
        Создать нового пользователя
      </Button>
      <div className="modal-box-users__list">
        {
          users.map(user => (
            <div className="modal-box-users__user">
              <span>{user.phone}</span> - <span>{user.fullName}</span> 
            </div>
          ))
        }
      </div>
      <div className="modal-box-users__buttons">
        <Button onClick={e => 1}>Добавить</Button>
        <Button onClick={e => 1}>Отмена</Button>
      </div>
    </div>
  );

  const pageAddUser = (
    <div className={`modal-box-users__inner modal-box-users__page-add-user`}>
      <div className="modal-box-users__header">
        Создание пользователя
      </div>
      {backBtn}
      {closeBtn}
      <div className="modal-box-users__inputs">
        <TextInput 
          key='phone'
          name='phone'
          mask="+7 (999) 999-99-99"
          type='text'
          value={phone}
          placeholder='+7 (___) ___-__-__' 
          onChange={(e) => {
            let { value } = e.currentTarget;
            value = value.replace(/[^0-9+]/g, "");
            setPhone(value);
          }}
          />
        <TextInput 
          key='full-name'
          name='full-name'
          mask=""
          type='text'
          value={fullName}
          placeholder='Имя' 
          onChange={(e) => {
            let { value } = e.currentTarget;
            setFullName(value);
          }}
          />
      </div>
      <div className="modal-box-users__buttons">
        <Button onClick={e => 1}>Добавить</Button>
        <Button onClick={e => 1}>Отмена</Button>
      </div>
    </div>
  );

  return(
    <div className={`modal-box-users modal-box-users_${isVisible ? 'visible' : 'hidden'}`}>
      {page === 'all-users' ? pageAllUsers : null}
      {page === 'add-user' ? pageAddUser : null}
    </div>
  );
}

export default ModalBoxUsers;
