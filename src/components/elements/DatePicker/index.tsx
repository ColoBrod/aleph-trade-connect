import React, { MouseEvent } from 'react';

import './style.css'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { displaySet as calendarDisplaySet, displaySet } from '~/store/ui/calendar';

const DatePicker = () => {
  // const { start, end } = useAppSelector(state => state.filters.analytics.common.dateRange);

  // e: MouseEvent<HTMLInputElement, MouseEvent<Element, MouseEvent>>

  const { start, end } = useAppSelector(state => state.filters.analytics.common.dateRange.date);
  const dispatch = useAppDispatch();
  
  const handleClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { id, innerHTML: date } = e.currentTarget;
    dispatch(displaySet({ id, date, x: rect.left, y: rect.top + rect.height }));
  }

  return (
    <div className="picker picker-date">
      <div  onClick={handleClick} className="picker__input start" id="date-start">
        { start }
      </div>
      <div  onClick={handleClick} className="picker__input end" id="date-end">
        { end }
      </div>
      {/* <input onClick={handleClick} className='picker__input start' type="date" name="date-start" id="date-start" />
      <input onClick={handleClick} className='picker__input end' type="date" name="date-start" id="date-end" /> */}
    </div>
  );
}
 
export default DatePicker;