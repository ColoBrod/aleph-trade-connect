import React, { ChangeEvent, useEffect, useState } from 'react';
import imgCloseBtn from './close-btn.svg';
// import imgBack from './back.svg';
import './style.css';
import { useAppDispatch, useAppSelector } from '~/hooks';
import TextInput from '~/components/ui/TextInput';
import Button from '~/components/ui/Button';
import { addUser, createUser, modalBoxPageSet, modalBoxToggled, modalBoxUserSet } from '~/store/pages/administration/company-structure';
import { IUser } from '~/interfaces/entities';

const ModalBoxUsers = () => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useAppDispatch();
  const { businessUnitId } = useAppSelector(
    state => state.pages.administration.companyStructure
  );
  const { isVisible, page, users, userId } = useAppSelector(
    state => state.pages.administration.companyStructure.modalBox
  );
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<IUser[]>([])

  useEffect(() => {
    const closeModalBox = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(modalBoxToggled(false));
    }
    if (isVisible === true) document.addEventListener('keydown', closeModalBox);
    return () => document.removeEventListener('keydown', closeModalBox);
  }, [isVisible])

  useEffect(() => {
    setFiltered([...users]);
  }, [users])

  useEffect(() => {
    if (page === 'all-users') return;
    const name: string[] = [];
    const phone: string[] = [];
    const arr = search.split("");
    arr.forEach(l => {
      if (l.match(/[0-9\+\(\)-]/)) phone.push(l);
      else if (l.match(/\S/)) name.push(l);
    });
    setPhone(phone.join(""));
    setFullName(name.join(""));

  }, [page])

  const closeBtn = (
    <img 
      src={imgCloseBtn} 
      onClick={e => dispatch(modalBoxToggled(false))}
      className='modal-box-users__close-btn'
      alt="Закрыть модальное окно с пользователями" 
      />
  );

  // const backBtn = (
  //   <img 
  //     src={imgBack}
  //     onClick={e => dispatch(modalBoxPageSet("all-users"))}
  //     className='modal-box-users__back-btn'
  //     alt="Назад" 
  //     />
  // )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const lowercase = value.toLowerCase();
    const f = users.filter(user => {
      const str = user.phone + " - " + user.fullName;
      return str.toLowerCase().includes(lowercase);
    })
    console.log(f);
    setFiltered(f);
    setSearch(value);
  }

  const pageAllUsers = (
    <div className={`modal-box-users__inner modal-box-users__page-all-users`}>
      {closeBtn}
      <div className="modal-box-users__header">
        Все пользователи
      </div>
      <div className="modal-box-users__top-bar">
        <TextInput 
          isSearch={true} 
          type='text'
          key='search'
          name='search'
          placeholder='Поиск' 
          value={search}
          onChange={handleSearch} 
        />
        <Button 
          // disabled={businessUnitId ? true : false}
          className='create-new-user-btn' 
          onClick={e => dispatch(modalBoxPageSet('add-user'))}
        >
          Создать пользователя
        </Button>
      </div>
      <div className="modal-box-users__list">
        {
          filtered.map(user => (
            <div 
              key={user.id}
              className={`modal-box-users__user ${userId === user.id ? 'active' : ''}`}
              onClick={() => {
                dispatch(modalBoxUserSet(user.id));
              }}
            >
              {user.phone} - {user.fullName}
            </div>
          ))
        }
      </div>
      <div className="modal-box-users__buttons">
        <Button 
          onClick={(e) => {
            dispatch(addUser({ userId, businessUnitId }));
            dispatch(modalBoxToggled(false));
            dispatch(modalBoxPageSet('all-users'));
          }}
          >Добавить
        </Button>
        <Button 
          onClick={(e) => {
            dispatch(modalBoxToggled(false));
            dispatch(modalBoxPageSet('all-users'));
          }}>Отмена</Button>
      </div>
    </div>
  );

  const pageAddUser = (
    <div className={`modal-box-users__inner modal-box-users__page-add-user`}>
      <div className="modal-box-users__header">
        Создание пользователя
      </div>
      {/* backBtn */}
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
        <Button 
          onClick={e => {
            dispatch(createUser({ fullName, phone }))
            dispatch(modalBoxPageSet('all-users'));
          }}
          >Добавить</Button>
        <Button 
          onClick={e => {
            // dispatch(modalBoxToggled(false));
            dispatch(modalBoxPageSet('all-users'));
          }}
          >Отмена</Button>
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
