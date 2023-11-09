import React from 'react';
import ReactDatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";

import './style.css'

import imgCalendar from './calendar.svg';

import { useAppDispatch, useAppSelector } from '~/hooks';

// const startdate = new Date();
// const enddate = new Date();

const DatePicker = () => {
  const { start, end } = useAppSelector(state => state.filters.dateRange);
  // const 

  return (
    <div className="picker picker-date">
      <div className="picker__from-txt">
        От
      </div>
      <div className="picker__to-txt">
        До
      </div>
      <div className="picker__from-input">

        <input type="date" name="date-start" id="date-start"  />

        {/* <ReactDatePicker 
          selected={start}
          onChange={(date) => console.log(date)}
        /> */}
      </div>
      <div className="picker__to-input">

        <input type="date" name="date-start" id="date-end"  />

        {/* <ReactDatePicker 
          selected={end}
          onChange={(date) => console.log(date)}
        /> */}
      </div>
      <img className='picker__icon' src={imgCalendar} alt="Календарь" />
    </div>
  );
}
 
export default DatePicker;