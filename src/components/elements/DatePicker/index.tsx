import React, { MouseEvent } from 'react';

import './style.css'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { displaySet as calendarDisplaySet, displaySet } from '~/store/ui/calendar';
import { IFiltersDateRange } from '~/interfaces/filters';

interface Props {
  dateRangeSet: Function;
  date: IFiltersDateRange['dateRange']['date'];
}

const DatePicker = ({ dateRangeSet, date }: Props) => {
  
  console.log("dateRangeSet", dateRangeSet);
  // const { start, end } = useAppSelector(state => state.filters.analytics.common.dateRange);

  // e: MouseEvent<HTMLInputElement, MouseEvent<Element, MouseEvent>>

  // const { start, end } = useAppSelector(state => state.filters.analytics.daylyReports.dateRange.date);
  const dispatch = useAppDispatch();
  
  const handleClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { id, innerHTML: date } = e.currentTarget;
    dispatch(displaySet({ id, date, x: rect.left, y: rect.top + rect.height }));
  }

  return (
    <div className="picker picker-date">
      <div onClick={handleClick} className="picker__input start" id="date-start">
        { date.start }
      </div>
      <div onClick={handleClick} className="picker__input end" id="date-end">
        { date.end }
      </div>
      {/* <input onClick={handleClick} className='picker__input start' type="date" name="date-start" id="date-start" />
      <input onClick={handleClick} className='picker__input end' type="date" name="date-start" id="date-end" /> */}
    </div>
  );
}
 
export default DatePicker;