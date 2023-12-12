import React from 'react';
import { useAppDispatch } from '~/hooks';
import { visibilitySet } from '~/store/ui/filters-aside';
import imgFilter from "~/assets/icons/filters.svg";
import './style.css';

const FiltersAsideButton = () => {
  const dispatch = useAppDispatch();
  return (
    <img 
      className='filters-aside__toggle-btn'
      src={imgFilter} 
      alt="Показать/Скрыть фильтры" 
      onClick={() => dispatch(visibilitySet(undefined))}
      />
  )
}

export default FiltersAsideButton;