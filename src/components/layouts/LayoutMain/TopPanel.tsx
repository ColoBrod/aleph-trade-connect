import React from 'react';
import AppName from '~/components/elements/AppName';
import Logo from '~/components/elements/Logo';
import ProfileElement from '~/components/elements/ProfileElement';
import SearchBar from './SeachBar';

import { useAppDispatch, useAppSelector } from '~/hooks';

interface Props {

}

const TopPanel = (props: Props) => {
  const { coffeeMachines, businessUnits } = useAppSelector(state => state.entities.data);
  const items = [...coffeeMachines, ...businessUnits];

  return (
    <div className="panel panel-top">
      <Logo fixed={true} />
      <div className="divider"></div>
      <div className="panel-top__inner">
        <div className="container-fluid">
          <AppName color="white" />
          <div className="spacer"></div>
          {/* items={items} */}
          <SearchBar items={items} />
          <ProfileElement />
        </div>
      </div>
    </div>
  );
}
 
export default TopPanel;