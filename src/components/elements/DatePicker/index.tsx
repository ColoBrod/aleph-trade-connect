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
  
  // const { start, end } = useAppSelector(state => state.filters.analytics.common.dateRange);

  // e: MouseEvent<HTMLInputElement, MouseEvent<Element, MouseEvent>>

  // const { start, end } = useAppSelector(state => state.filters.analytics.daylyReports.dateRange.date);
  const dispatch = useAppDispatch();
  
  const handleClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // const { id, innerHTML: date } = e.currentTarget;
    const { id, dataset: { date } } = e.currentTarget;
    dispatch(displaySet({ id, date, x: rect.left, y: rect.top + rect.height }));
  }
  
  // const handleChange = (e)

  const s = date.start.split('/');
  const e = date.end.split('/');
  const start = `${s[1]}.${s[0]}.${s[2]}`;
  const end = `${e[1]}.${e[0]}.${e[2]}`;

  return (
    <div className="picker picker-date">
      <div onClick={handleClick} className="picker__input start" id="date-start" data-date={date.start}>
        { start }
      </div>
      <div onClick={handleClick} className="picker__input end" id="date-end" data-date={date.end}>
        { end }
      </div>
      {/* <input onClick={handleClick} value={start} className='picker__input start' type="text" name="date-start" id="date-start" />
      <input onClick={handleClick} value={end} className='picker__input end' type="text" name="date-end" id="date-end" /> */}
    </div>
  );
}
 
export default DatePicker;