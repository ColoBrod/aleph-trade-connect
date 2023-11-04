import React from 'react';
import { Link } from 'react-router-dom';
import AppName from '~/components/elements/AppName';
import Logo from '~/components/elements/Logo';
import ProfileElement from '~/components/elements/ProfileElement';
import SearchBar from './SeachBar';

interface Props {
}

const TopPanel = (props: Props) => {
  return (
    <div className="panel panel-top">
      <Logo />
      <div className="divider"></div>
      <AppName color="white" />
      {/* <Link className='contact-link' to="/contact">Contact</Link> */}
      <div className="spacer"></div>
      <SearchBar />
      <ProfileElement />
    </div>
  );
}
 
export default TopPanel;