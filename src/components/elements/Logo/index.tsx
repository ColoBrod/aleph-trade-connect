import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import imgLogoLight from './img/logo-light.svg';
import imgLogoDark from './img/logo-dark.svg';

interface Props {
  color?: 'light' | 'dark';
  active?: boolean
  fixed?: boolean;
}

const Logo = (props: Props) => {
  const { color = 'light', fixed, active = true } = props;
  const imgSrc = color === 'light' ? imgLogoLight : imgLogoDark;
  if (active) return (
    <Link className={`logo logo-square ${fixed ? 'logo-fixed' : ''}`} to="/" >
      <img src={imgSrc} alt="Логотип WMF" />
    </Link>
  );
  else return (
    <span className={`logo logo-square ${fixed ? 'logo-fixed' : ''}`} >
      <img src={imgSrc} alt="Логотип WMF" />
    </span>
  );
}
 
export default Logo;