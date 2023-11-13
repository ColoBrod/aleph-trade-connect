import React from 'react';

import './style.css'

import { useAppDispatch, useAppSelector } from '~/hooks';

const DatePicker = () => {
  const { start, end } = useAppSelector(state => state.filters.dateRange);

  return (
    <div className="picker picker-date">
      <input className='picker__input start' type="date" name="date-start" id="date-start"  />
      <input className='picker__input end' type="date" name="date-start" id="date-end"  />
    </div>
  );
}
 
export default DatePicker;