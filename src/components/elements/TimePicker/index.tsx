import React, { ChangeEvent, ChangeEventHandler, ReactNode } from 'react';

import './style.css'
import { IFiltersDateRange } from '~/interfaces/filters';
import { useAppDispatch } from '~/hooks';

// import { useAppDispatch, useAppSelector } from '~/hooks';

const time: string[] = [];
for (let i = 0; i < 24; i++) {
  let n = i.toString();
  if (n.length === 1) n = "0" + n;
  n += ":00"
  time.push(n)
}

interface Props {
  time: IFiltersDateRange['dateRange']['time'];
  timeRangeSet: Function;
  // start?: number | string;
  // end?: number | string;
  // onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const TimePicker = (props: Props) => {
  // const { start, end } = useAppSelector(state => state.filters.dateRange);
  const { time: timeObj, timeRangeSet } = props;
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id.includes('start')) dispatch(timeRangeSet({ start: value }));
    if (id.includes('end')) dispatch(timeRangeSet({ end: value }));
    // console.log(id, value);
    
    // dispatch(timeRangeSet())
    
  }

  const renderPicker = (type: "start" | "end", value: string): ReactNode => {
    if (value === undefined) value = "00:00"
    const id = `time-${type}`;
    return (
      <select defaultValue={value} onChange={handleChange} name={id} id={id} className={`picker__input ${type}`}>
        {time.map((t, i) => <option key={i} value={t}>{t}</option>)}
      </select>
    );
  }

  return (
    <div className="picker picker-time">
      {renderPicker("start", timeObj.start)}
      {renderPicker("end", timeObj.end)}
      {/* <DropDownList items={items} name='time-start'/>
      <DropDownList items={items} name='time-end'/> */}
      {/* <input className='picker__input start' step="3600" type="time" name="time-start" id="time-start"  />
      <input className='picker__input end' step="3600" type="time" name="time-start" id="time-end"  /> */}
    </div>
  );
}
 
export default TimePicker;