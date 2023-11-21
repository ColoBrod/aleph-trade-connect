import React from 'react';

import './style.css'

import { useAppDispatch, useAppSelector } from '~/hooks';
import DropDownList from '~/components/ui/DropDownList';

// const time = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
// const items = time.map(t => ({ value: t, innerHTML: t }));

const TimePicker = () => {
  // const { start, end } = useAppSelector(state => state.filters.dateRange);

  return (
    <div className="picker picker-time">
      {/* <DropDownList items={items} name='time-start'/>
      <DropDownList items={items} name='time-end'/> */}
      <input className='picker__input start' step="3600" type="time" name="time-start" id="time-start"  />
      <input className='picker__input end' step="3600" type="time" name="time-start" id="time-end"  />
    </div>
  );
}
 
export default TimePicker;