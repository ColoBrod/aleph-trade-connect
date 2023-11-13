import React from 'react';

import './style.css'

import { useAppDispatch, useAppSelector } from '~/hooks';

const TimePicker = () => {
  // const { start, end } = useAppSelector(state => state.filters.dateRange);

  return (
    <div className="picker picker-time">
      <input className='picker__input start' step="3600" type="time" name="time-start" id="time-start"  />
      <input className='picker__input end' step="3600" type="time" name="time-start" id="time-end"  />
    </div>
  );
}
 
export default TimePicker;