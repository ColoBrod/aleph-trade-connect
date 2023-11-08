import React from 'react';
import { NavLink } from 'react-router-dom';

import imgAccountGroup from './img/account-group.svg';
import imgClipboardText from './img/clipboard-text.svg';
import imgEmailFast from './img/email-fast.svg';
import imgHeartPulse from './img/heart-pulse.svg';
import imgMapSearch from './img/map-search.svg';

const items = [
  { icon: imgClipboardText, path: "/analytics", name: "Аналитика" },
  { icon: imgHeartPulse, path: "/maintenance", name: "Состояние оборудования" },
  { icon: imgAccountGroup, path: "/administration", name: "Администрирование" },
  { icon: imgMapSearch, path: "/map", name: "Карта" },
  // Last item with help
  { icon: imgEmailFast, path: "/docs", name: "Документация" },
];

interface Props {
}

const TopPanel = (props: Props) => {
  return (
    <div className="panel panel-left">
      {items.map((item) => (
        <NavLink key={item.path} className={"panel-left__item"} to={item.path}>
          <img src={item.icon} alt={item.name} />
        </NavLink>
      ))}
    </div>
  );
}
 
export default TopPanel;