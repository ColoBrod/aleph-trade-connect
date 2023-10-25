import React from 'react';

import './style.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  avatar?: string;
  fullName: string;
}

const ProfileElement = (props: Props) => {
  const { avatar, fullName } = props;
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/profile')} className="profile-element">
      <div className="profile-element__icon"></div>
      <div className="profile-element__name">{fullName}</div>
    </div>
  );
}
 
export default ProfileElement;