import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import imgAccountGroup from './img/account-group.svg';
import imgClipboardText from './img/clipboard-text.svg';
import imgEmailFast from './img/email-fast.svg';
import imgHeartPulse from './img/heart-pulse.svg';
import imgMapSearch from './img/map-search.svg';
import { useAppDispatch } from '~/hooks';
import { tooltipHid, tooltipShown } from '~/store/ui/tooltip';

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
  const dispatch = useAppDispatch();
  // const { pathname } = useLocation();

  // useEffect(() => {
    // const pathArr = pathname.split("/").filter(el => el);
    // const item = items.find(item => pathname.includes(item.path));
    // console.log("%cPath:", "color: green; font-size: 30px;")
    // console.log(pathname, pathArr, item);
    // if (item) item.path = pathname;
  // }, [pathname])

  return (
    <div className="panel panel-left">
      {items.map((item) => (
        <NavLink key={item.path} className={"panel-left__item"} to={item.path}>
          <img 
            src={item.icon} 
            alt={item.name} 
            onMouseEnter={(e) => {
              const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
              const abs_x = x + 60;
              const abs_y = y + 18;
              dispatch(tooltipShown({ 
                text: item.name, 
                coords: { x: abs_x, y: abs_y },
                place: 'right',
              }))
            }}
            onMouseLeave={() => dispatch(tooltipHid())}
            />
        </NavLink>
      ))}
    </div>
  );
}
 
export default TopPanel;