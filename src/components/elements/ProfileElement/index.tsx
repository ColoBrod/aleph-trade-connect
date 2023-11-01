import React, { useEffect, useRef, useState } from 'react';

import './style.css';
import { useNavigate } from 'react-router-dom';

const ARROW_UP = <svg 
  fill='white'
  aria-hidden="true" 
  className="svg-icon iconArrowUp" 
  width="18" height="18" 
  viewBox="0 0 18 18"><path d="M1 12h16L9 4l-8 8Z"></path></svg>;
const ARROW_DOWN = <svg 
  fill='white'
  aria-hidden="true" 
  className="svg-icon iconArrowDown" 
  width="18" height="18" 
  viewBox="0 0 18 18"><path d="M1 6h16l-8 8-8-8Z"></path></svg>;

interface Props {
  avatar?: string;
  fullName: string;
}

const ProfileElement = (props: Props) => {
  const { avatar, fullName } = props;
  const [displayPopup, useDisplayPopup] = useState(false);
  const navigate = useNavigate();

  const ref = useRef(null)

  const openProfileInfoPage = () => {
    useDisplayPopup(false);
    navigate('/profile');
  }
  const openProfileEditPage = () => {
    useDisplayPopup(false);
    navigate('/profile');
  }
  const openProfileLogoutPage = () => {
    useDisplayPopup(false);
    navigate('/auth');
  }
  const handleClickOutside = (e: MouseEvent): void => {
    // @ts-ignore
    // if (ref.current !== e.target && !ref.current?.contains(e.target)) useDisplayPopup(false);
  }
  const togglePopup = () => displayPopup 
    ? useDisplayPopup(false) 
    : useDisplayPopup(true);

  useEffect(() => {
    console.log(displayPopup);
    if (displayPopup) document.addEventListener("click", handleClickOutside) 
    // else document.removeEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [displayPopup])

  
  
  return (
    <div className="profile-element">
      <div onClick={togglePopup} className="profile-element__inner">
        <div className="profile-element__icon"></div>
        <div className="profile-element__name">{fullName}</div>
        <div className="profile-element__arrow">
          { displayPopup ? ARROW_UP : ARROW_DOWN }
        </div>
      </div>
      {
        displayPopup && 
        <div ref={ref} className="profile-element__popup">
          <div onClick={openProfileInfoPage} className="profile-element__popup__user">
            <div className="profile-element__popup__user__full-name">
              Лазарев Николай
            </div>
            <div className="profile-element__popup__user__email">
              lazarev.n.f@outlook.com              
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