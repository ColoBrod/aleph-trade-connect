import React from 'react';
import { NavLink } from 'react-router-dom';

const items = [
  { icon: "Ан", path: "/analytics", name: "Аналитика" },
  { icon: "СО", path: "/maintenance", name: "Состояние оборудования" },
  { icon: "Ад", path: "/administration", name: "Администрирование" },
  { icon: "Ка", path: "/map", name: "Карта" },
  // Last item with help
  { icon: "?", path: "/docs", name: "Документация" },
];

interface Props {
}

const TopPanel = (props: Props) => {
  return (
    <div className="panel panel-left">
      {items.map((item) => (
        <NavLink key={item.path} className={"panel-left__item"} to={item.path}>
          {item.icon}
        </NavLink>
      ))}
    </div>
  );
}
 
export default TopPanel;