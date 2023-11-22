import React, { ChangeEventHandler, ReactNode } from 'react';

import './style.css'

// import { useAppDispatch, useAppSelector } from '~/hooks';

const time: string[] = [];
for (let i = 0; i < 24; i++) {
  let n = i.toString();
  if (n.length === 1) n = "0" + n;
  n += ":00"
  time.push(n)
}

interface Props {
  start?: number | string;
  end?: number | string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const TimePicker = (props: Props) => {
  // const { start, end } = useAppSelector(state => state.filters.dateRange);
  const { onChange: handleChange } = props;

  const renderPicker = (type: "start" | "end"): ReactNode => {
    const id = `time-${type}`;
    return (
      <select onChange={handleChange} name={id} id={id} className={`picker__input ${type}`}>
        {time.map((t, i) => <option value={i}>{t}</option>)}
      </select>
    );
  }

  return (
    <div className="picker picker-time">
      {renderPicker("start")}
      {renderPicker("end")}
      {/* <DropDownList items={items} name='time-start'/>
      <DropDownList items={items} name='time-end'/> */}
      {/* <input className='picker__input start' step="3600" type="time" name="time-start" id="time-start"  />
      <input className='picker__input end' step="3600" type="time" name="time-start" id="time-end"  /> */}
    </div>
  );
}
 
export default TimePicker;