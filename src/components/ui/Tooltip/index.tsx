import React from 'react';
import './style.css';
import { useAppSelector, useAppDispatch } from '~/hooks';

interface Coords {
  x: number;
  y: number;
}

// interface Props {
//   coords: (() => Coords) | Coords;
//   text: string;
//   visibility: 'hidden' | 'visible';
//   place?: 'bottom' | 'top' | 'left' | 'right';
// }
// { coords, text, visibility, place = 'right' }: Props
const Tooltip = () => {
  const { coords, text, place, visibility } = useAppSelector(state => state.ui.tooltip)
  const { x, y } = coords;
  
  // const { coords, text, visibility, place }

  // let x: number, y: number;
  // if (typeof coords === 'function') {
  //   const pos = coords();
  //   x = pos.x;
  //   y = pos.y;
  // }
  // else {
  //   x = coords.x;
  //   y = coords.y;
  // }
  const modi_visibility = "tooltip_" + visibility;
  const modi_place = "tooltip_" + place;

  return(
    <div 
      className={`tooltip ${modi_visibility} ${modi_place}`}
      style={{ top: y + 'px', left: x + 'px' }}
    >
      {text} 
    </div>
  )
}

export default Tooltip;
