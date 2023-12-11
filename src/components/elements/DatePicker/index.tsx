import React, { ChangeEvent, MouseEvent, useState } from 'react';

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

  const { visible } = useAppSelector(state => state.ui.calendar);

  const dispatch = useAppDispatch();
  
  const handleClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    const parent = e.currentTarget.closest('.picker__input') as HTMLInputElement;
    if (parent === null) return;
    const rect = parent.getBoundingClientRect();
    const { id, dataset: { date } } = parent;
    console.log("Parent:", id, date, rect.left, rect.top, rect.height);
    if (visible === false)
      setTimeout(() => dispatch(displaySet({ 
        id, date, x: rect.left, y: rect.top + rect.height 
      })), 20)
  }
  
  const s = date.start.split('/');
  const e = date.end.split('/');
  const start = `${s[1]}.${s[0]}.${s[2]}`;
  const end = `${e[1]}.${e[0]}.${e[2]}`;
  const [d1, setD1] = useState(start);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const { value } = input;
    const match = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
    const placeholder = "__.__.____";
    if (match === null) return;
    const res = placeholder.split("");
    const substr = match[0];
    const arr = substr.split('');
    let pos = 0;

    res.forEach((l: string, i: number) => {
      if (res[i] === '.') return;
      const d = arr.shift();
      if (d === undefined) return;
      pos = i;
      res[i] = d;
    })
    
    pos += 1;

    const str = res.join('');
    setD1(str);
    // const pos = substr.length;
    // console.log(input);
    // console.log("length:", pos)
    console.log(pos);
    setTimeout(() => input.setSelectionRange(pos, pos), 1) ;

    // substr.split('').forEach((l, i) => res[i] = l);
    // setD1(res.join(''));
    // console.log(res, substr)


    // const dd = match[1] || "__"
    // const mm = match[2] || "__"
    // const yyyy = match[3] || "____"
    // setD1(`${dd}.${mm}.${yyyy}`)



  }

  return (
    <div className="picker picker-date">
      <div className="picker__input start" id="date-start" data-date={date.start}>
        <input 
          onChange={handleChange} 
          value={d1}
          type="text" 
          />
        <div onClick={handleClick} className="picker-date__icon"></div>
      </div>
      <div className="picker__input end" id="date-end" data-date={date.end}>
        { end }
        <div onClick={handleClick} className="picker-date__icon"></div>
      </div>
      {/* <input onClick={handleClick} value={start} className='picker__input start' type="text" name="date-start" id="date-start" />
      <input onClick={handleClick} value={end} className='picker__input end' type="text" name="date-end" id="date-end" /> */}
    </div>
  );
}
 
export default DatePicker;