import React from 'react';

import './style.css';
import { NavLink, Outlet } from 'react-router-dom';
import UploadImage from './UploadImage';

const Profile = () => {
  return (
    <div className="page page-profile">
      <div className="page-profile__nav">
        <div className="page-profile__nav-inner">

          <div className="page-profile__nav-header">Мой профиль</div>
          <NavLink className="page-profile__nav-link" to="/profile/common">Личные данные</NavLink>
          <NavLink className="page-profile__nav-link" to="/profile/credentials">Пароль</NavLink>
          <NavLink className="page-profile__nav-link" to="/profile/delete-account">Удалить аккаунт</NavLink>
          <div className="page-profile__nav-header">Юридический</div>
          <a className="page-profile__nav-link" href="https://google.com" target='_blank'>Условия эксплуатации</a>
          <a className="page-profile__nav-link" href="https://google.com" target='_blank'>Заявление о защите данных</a>
          <a className="page-profile__nav-link" href="https://google.com" target='_blank'>Политика использования файлов</a>
        </div>
      </div>
      <div className="page-profile__content">
        <Outlet />
      </div>
      <UploadImage />
    </div>

  );
}
 
export default Profile;