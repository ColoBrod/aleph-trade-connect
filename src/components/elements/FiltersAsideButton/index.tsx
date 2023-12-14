import React from 'react';
import { useAppDispatch } from '~/hooks';
import { visibilitySet } from '~/store/ui/filters-aside';
import imgFilter from "~/assets/icons/filters.svg";
import './style.css';

interface Props {
  layout?: 'outline' | 'no-outline';
}

const FiltersAsideButton = ({ layout = 'outline' }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <img 
      className={`filters-aside__toggle-btn ${layout}`}
      src={imgFilter} 
      alt="Показать/Скрыть фильтры" 
      onClick={() => dispatch(visibilitySet(undefined))}
      />
  )
}

export default FiltersAsideButton;