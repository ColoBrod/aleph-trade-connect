import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
// import ReactInputDateMask from 'react-input-date-mask';
import InputMask from 'react-input-mask'; 

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
    if (visible === false)
      setTimeout(() => dispatch(displaySet({ 
        id, date, x: rect.left, y: rect.top + rect.height 
      })), 20)
  }
  
  const s = date.start.split('/');
  const e = date.end.split('/');
  // const start = `${s[1]}.${s[0]}.${s[2]}`;
  // const end = `${e[1]}.${e[0]}.${e[2]}`;
  const start = fmtLeadZero(s);
  const end = fmtLeadZero(e);



  // const leadZeroStart = s[0].toString().padStart(2, '0');
  // const leadZeroEnd = end.toString().padStart(2, '0')

  // const [d1, setD1] = useState(start);
  // useEffect(() => {}, [start, end])

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const input = e.currentTarget;
  //   const { value } = input;
  //   const match = value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
  //   const placeholder = "__.__.____";
  //   if (match === null) return;
  //   const res = placeholder.split("");
  //   const substr = match[0];
  //   const arr = substr.split('');
  //   let pos = 0;

  //   res.forEach((l: string, i: number) => {
  //     if (res[i] === '.') return;
  //     const d = arr.shift();
  //     if (d === undefined) return;
  //     pos = i;
  //     res[i] = d;
  //   })
    
  //   pos += 1;
  //   const str = res.join('');
  //   setD1(str);
  //   // const pos = substr.length;
  //   setTimeout(() => input.setSelectionRange(pos, pos), 1) ;

  //   // substr.split('').forEach((l, i) => res[i] = l);
  //   // setD1(res.join(''));
  //   // const dd = match[1] || "__"
  //   // const mm = match[2] || "__"
  //   // const yyyy = match[3] || "____"
  //   // setD1(`${dd}.${mm}.${yyyy}`)
  // }

  var validateDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    const key = id.includes('start') 
      ? 'start'
      : 'end';
    if (value.match(/_/)) return;
    const match = value.match(/(\d\d)\.(\d\d)\.(\d\d\d\d)/);
    if (!match) return;
    const dd = match[1];
    const mm = match[2];
    const yyyy = match[3];
    const dateStr = `${yyyy}-${mm}-${dd}`;
    if (validateDate(dateStr)) {
      const payload = { [key]: `${mm}/${dd}/${yyyy}` }
      dispatch(dateRangeSet(payload));
    }
    else alert("Неправильная дата");
  }

  return (
    <div className="picker picker-date">
      <div key={start} className="picker__input start" id="date-start" data-date={date.start}>
        {/* <input 
          onChange={handleChange} 
          value={d1}
          type="text" 
          /> */}
          {/* <ReactInputDateMask /> */}
        <InputMask id='date-input-start' mask="99.99.9999" maskChar="_" onChange={handleChange} defaultValue={start} />
        <div onClick={handleClick} className="picker-date__icon"></div>
      </div>
      <div key={end} className="picker__input end" id="date-end" data-date={date.end}>
        {/* { end } */}
        <InputMask id='date-input-end' mask="99.99.9999" maskChar="_" onChange={handleChange} defaultValue={end} />
        <div onClick={handleClick} className="picker-date__icon"></div>
      </div>
      {/* <input onClick={handleClick} value={start} className='picker__input start' type="text" name="date-start" id="date-start" />
      <input onClick={handleClick} value={end} className='picker__input end' type="text" name="date-end" id="date-end" /> */}
    </div>
  );
}

function fmtLeadZero(d: string[]) {
  const dd = d[1].padStart(2, '0');
  const mm = d[0].padStart(2, '0');
  const yyyy = d[2];
  return `${dd}.${mm}.${yyyy}`;
}

export default DatePicker;