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
      <Logo fixed={true} />
      <div className="divider"></div>
      <div className="panel-top__inner">
        <div className="container-fluid">
          <AppName color="white" />
          <div className="spacer"></div>
          <SearchBar />
          <ProfileElement />
        </div>
      </div>
    </div>
  );
}
 
export default TopPanel;