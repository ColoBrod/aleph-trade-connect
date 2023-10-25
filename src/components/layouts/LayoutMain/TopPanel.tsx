import React from 'react';
import { Link } from 'react-router-dom';
import AppName from '~/components/elements/AppName';
import Logo from '~/components/elements/Logo';
import ProfileElement from '~/components/elements/ProfileElement';

interface Props {
}

const TopPanel = (props: Props) => {
  return (
    <div className="panel panel-top">
      <Logo />
      <AppName color="white" />
      <Link className='contact-link' to="/contact">Contact</Link>
      <ProfileElement fullName="Лазарев Николай" />
    </div>
  );
}
 
export default TopPanel;