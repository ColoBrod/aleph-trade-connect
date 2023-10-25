import React from 'react';

import './style.css';
import { NavLink, Outlet } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="page page-profile">
      <div className="page-profile__nav">
        <h1>Мой профиль</h1>
        <NavLink to="/profile/common">Личные данные</NavLink>
        <NavLink to="/profile/credentials">Пароль</NavLink>
        <NavLink to="/profile/delete-account">Удалить аккаунт</NavLink>
        <h2>Юридический</h2>
        <a href="https://google.com" target='_blank'>Условия эксплуатации</a>
        <a href="https://google.com" target='_blank'>Заявление о защите данных</a>
        <a href="https://google.com" target='_blank'>Политика использования файлов</a>
      </div>
      <div className="page-profile__content">
        <Outlet />
      </div>
    </div>

  );
}
 
export default Profile;