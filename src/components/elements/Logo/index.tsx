import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

interface Props {
  fixed?: boolean;
}

const Logo = (props: Props) => {
  const { fixed } = props;
  return (
    <Link className={`logo logo-square ${fixed ? 'logo-fixed' : ''}`} to="/" />
  );
}
 
export default Logo;