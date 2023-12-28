import React, { useEffect, useRef, useState } from 'react';

import './style.css';
import { useNavigate } from 'react-router-dom';
import { ARROW_UP, ARROW_DOWN } from './arrows';

// Redux
import { popupToggled } from '~/store/ui/profile';
import { useAppDispatch, useAppSelector } from '~/hooks';

// Images
import imgAccount from './img/account.svg';
import imgArrow from './img/arrow.svg';

interface Props {
}

const ProfileElement = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fullName, email, avatar, displayPopup } = useAppSelector(
    (state) => state.ui.profile 
  );
  const ref = useRef(null)

  const openProfileInfoPage = () => {
    dispatch(popupToggled({ display: false }))
    navigate('/profile');
  }
  const openProfileEditPage = () => {
    dispatch(popupToggled({ display: false }))
    navigate('/profile');
  }
  const openProfileLogoutPage = () => {
    dispatch(popupToggled({ display: false }))
    navigate('/auth');
  }
  const handleClickOutside = (e: MouseEvent): void => {
    // @ts-ignore
    // if (ref.current !== e.target && !ref.current?.contains(e.target)) useDisplayPopup(false);
  }
  const togglePopup = () => {
  }

  // useEffect(() => {
  //   if (displayPopup) document.addEventListener("click", handleClickOutside) 
  //   // else document.removeEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, [displayPopup])
  
  return (
    <div className="profile-element">
      <div onClick={() => dispatch(popupToggled({}))} className="profile-element__inner">
        <div className="profile-element__icon">
          <img src={avatar ? avatar : imgAccount} alt="" />
        </div>
        <div className="profile-element__name">{fullName}</div>
        <div className="profile-element__arrow">
          <img src={imgArrow} alt="" />
          {/* { displayPopup ? ARROW_UP : ARROW_DOWN } */}
        </div>
      </div>
      {
        displayPopup && 
        <div ref={ref} className="profile-element__popup">
          <div onClick={openProfileInfoPage} className="profile-element__popup__user">
            <div className="profile-element__popup__user__full-name">
              {fullName}
            </div>
            <div className="profile-element__popup__user__email">
              {email}
            </div>
          </div>
          <div onClick={openProfileEditPage} className="profile-element__popup__edit">
            Редактировать
          </div>
          <div onClick={openProfileLogoutPage} className="profile-element__popup__logout">
            Выйти
          </div>
        </div>
      }
    </div>
  );

  // function togglePopup() {

  // }
}
 
export default ProfileElement;