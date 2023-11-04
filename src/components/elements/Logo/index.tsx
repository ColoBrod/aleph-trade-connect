import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import imgLogo from './img/logo.svg';

interface Props {
  fixed?: boolean;
}

const Logo = (props: Props) => {
  const { fixed } = props;
  return (
    <Link className={`logo logo-square ${fixed ? 'logo-fixed' : ''}`} to="/" >
      <img src={imgLogo} alt="Логотип WMF" />
    </Link>
  );
}
 
export default Logo;