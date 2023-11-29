import React, { ReactNode, useState, useEffect, MouseEvent } from 'react';
import './style.css';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { displaySet, monthSet, yearSet } from '~/store/ui/calendar';
import { useLocation } from 'react-router-dom';

import imgArrowLeft from './arrow-left.svg';
import imgArrowRight from './arrow-right.svg';

type Period = { mm: number, yyyy: number };
type PickMode = 'date' | 'month' | 'month-62';

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const { dates: dates62, periods: periods62 } = get62();

interface CalendarProps {
  type?: "any-date" | "62-days";
  actionCreator: Function;
}

const Calendar = (props: CalendarProps) => {
  const { type = "any-date", actionCreator } = props;
  const dispatch = useAppDispatch();
  const calendar = useAppSelector(state => state.ui.calendar);
  const { date: dateStr, id, month, year } = calendar;
  const [m, d, y] = dateStr.split("/").map(el => parseInt(el));
  const date = new Date(y, m-1, d);
  const display = calendar.visible ? "block" : "none";
  const visibility = calendar.visible ? "visible" : "hidden";
  const left = calendar.x + "px";
  const top = calendar.y + "px";

  const [pickMode, setPickMode] = useState<PickMode>("date");

  const togglePickMode = () => {
    if (type === 'any-date')
      setPickMode(pickMode === 'date' ? 'month' : 'date');
    else if (type === '62-days')
      setPickMode(pickMode === 'date' ? 'month-62' : 'date');
  }
  const years = [...Array(50).keys()].map(index => 2023 + index)

  const curMonth = months[month];
  const curYear = year.toString();

  const monthToDisplay = new Date(year, month);
  const dates = getDates(monthToDisplay);
  const location = useLocation();

  useEffect(() => {
    dispatch(displaySet({ visible: false }))
  }, [location])

  useEffect(() => {
    if (!calendar.visible) return
    const handleClickOutside = (e: MouseEvent<Document>): void => {
      // @ts-ignore
      if (e.target.classList.contains('picker__input')) return
      // @ts-ignore
      if (e.target.closest('.calendar')) return;
      dispatch(displaySet({ visible: false }))
    }
    // @ts-ignore
    document.addEventListener('click', handleClickOutside); 
    // @ts-ignore
    return () => document.removeEventListener('click', handleClickOutside);
  }, [calendar.visible, location])

  const shiftPeriod = (offset: number) => {
    offset = Math.round(offset);
    const curPeriodIndex = periods62.findIndex(
      (p: Period) => p.mm === month && p.yyyy === year
    );
    const prevPeriod = periods62[curPeriodIndex + offset];
    if (prevPeriod === undefined) return;
    const mm = prevPeriod.mm;
    const yyyy = prevPeriod.yyyy;
    dispatch(monthSet({ month: mm }));
    dispatch(yearSet({ year: yyyy }));
  }

  const renderSelectionRow = (): ReactNode => {
    const curPeriodIndex = periods62.findIndex(
      (p: Period) => p.mm === month && p.yyyy === year
    );
    const nextPeriodAvailable = periods62[curPeriodIndex - 1] === undefined
      ? 'disabled'
      : 'available'
    const prevPeriodAvailable = periods62[curPeriodIndex + 1] === undefined
      ? 'disabled'
      : 'available'

    if (type === 'any-date') return (
      <>
        <div className="calendar__month-picker" onClick={togglePickMode}>
          {curMonth}
        </div>
        <div className="calendar__year-picker" onClick={togglePickMode}>
          {curYear}
        </div>
      </>
    );
    else if (type === '62-days') return (
      <>
        <img 
          className={`calendar__selection-arrow ${prevPeriodAvailable}`} 
          src={imgArrowLeft} 
          alt="Left arrow" 
          onClick={() => shiftPeriod(1)}
          />
        <div className="calendar__year-month-picker" onClick={togglePickMode}>
          {curMonth} {curYear} 
        </div>
        <img 
          className={`calendar__selection-arrow ${nextPeriodAvailable}`} 
          src={imgArrowRight} 
          alt="Right arrow" 
          onClick={() => shiftPeriod(-1)}
          />
      </>
    )
  }

  const renderWeekdays = (): ReactNode => weekdays.map((wd, i) => (
    <span key={i} className='calendar__weekday'>{wd}</span>
  ));

  const renderDates = (): ReactNode => dates.map(dateObj => {
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth();
    const yyyy = dateObj.getFullYear();
    // let disabled: string;
    const disabled: string = mm === month
      ? ''
      : 'disabled';
    let unavailable = "";
    if (type === '62-days') {
      // @ts-ignore
      const timeEnd = dates62.at(0).getTime();
      // @ts-ignore
      const timeStart = dates62.at(-1).getTime();
      const curTime = dateObj.getTime();
      if (curTime > timeEnd || curTime < timeStart) unavailable = 'unavailable';
    }
    const active = 
      dd === date.getDate() && 
      mm === date.getMonth() && 
      yyyy === date.getFullYear()
        ? 'active'
        : '';
    return (
      <span 
        key={`${mm}/${dd}/${yyyy}`}
        onClick={() => {
          if (unavailable === 'unavailable') return;
          const dd = dateObj.getDate();
          const mm = dateObj.getMonth() + 1;
          const yyyy = dateObj.getFullYear();
          const payload = id === 'date-start'
            ? { start: `${mm}/${dd}/${yyyy}` }
            : { end: `${mm}/${dd}/${yyyy}` };
          dispatch(actionCreator(payload))
          dispatch(displaySet({ visible: false }))
          // handler(id, dateObj)
        }}
        className={`calendar__monthday ${disabled} ${active} ${unavailable}`}>
        {dd}
      </span>
    );
  });

  const renderMonthPicker = () => (
    <div className="calendar__scroll-area">
      <div className="calendar__month-area">
        {
          months.map((m, i) => 
            <div 
              key={m} 
              onClick={() => {
                dispatch(monthSet({ month: i }));
                setPickMode('date')
              }}
              className={`calendar__month ${i === month ? 'active' : ''}`}>
              {m}
            </div>
          )
        }
      </div>
      <div className="calendar__year-area">
        {
          years.map((y) => 
            <div 
              onClick={() => {
                dispatch(yearSet({ year: y }));
                setPickMode('date')
              }}
              key={y} 
              className={`calendar__year ${y === year ? 'active' : ''}`}>
              {y}
            </div>
          )
        }
      </div>
    </div>
  );

  const renderMonthPicker62 = () => {
    return (
      <div className="calendar__scroll-area">
        <div className="calendar__year-month-area">
          {
            periods62.map((period: Period): ReactNode => {
              const { mm, yyyy } = period
              return (
                <div 
                  key={`${mm+1}/${yyyy}`}
                  className={`
                    calendar__year-month 
                    ${mm === month && yyyy === year ? 'active' : ''}
                  `}
                  onClick={() => {
                    dispatch(monthSet({ month: mm }));
                    dispatch(yearSet({ year: yyyy }));
                    setPickMode('date');
                  }}
                >
                  {months[mm]} {yyyy}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  return (
    <div className="calendar" style={{ display, left, top }} >
      <div className="calendar__selection-row">
        {renderSelectionRow()}
      </div>
      {
        pickMode === 'date' 
          ? <div className="calendar__grid">
              <div className="calendar__grid-inner">
                {renderWeekdays()}
                {renderDates()}
              </div>
            </div>
          : null
      }
      {
        pickMode === 'month'
          ? renderMonthPicker()
          : null
      }
      {
        pickMode === 'month-62'
          ? renderMonthPicker62()
          : null
      }
    </div>
  );
}

function getDates(date: Date): Date[] {
  // Устанавливаем первый день месяца
  date = new Date(date);
  date.setDate(1);

  // Последний день месяца - number (30)
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  // Последний день предыдущего месяца - number (31)
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  // День недели первого дня месяца
  const firstDayIndex = fmtDayIndex(date.getDay());

  // День недели последнего дня месяца
  const lastDayIndex = fmtDayIndex(new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay());

  // Устанавливает Понедельник как 0, Вс - 6
  function fmtDayIndex(index: number) {
    index -= 1;
    return index === -1 ? 6 : index;
  }

  const dates: Date[] = [];

  let d = new Date(date);
  d.setDate(d.getDate() - (firstDayIndex + 1));
  for (let i = 0; i < firstDayIndex; i++) {
    d.setDate(d.getDate() + 1);
    dates.push(new Date(d));
  }

  for (let i = 0; i < lastDay; i++) {
    d.setDate(d.getDate() + 1);
    dates.push(new Date(d));
  }

  for (let i = lastDayIndex; i < 6; i++) {
    d.setDate(d.getDate() + 1);
    dates.push(new Date(d));
  }

  return dates;
}

function get62(): { dates: Date[], periods: Period[] } {
  const dates: Date[] = [];
  const periods: Period[] = [];
  for (let i = 0; i < 62; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date);
    const mm = date.getMonth();
    const yyyy = date.getFullYear();
    const found = periods.find(p => p.mm === mm && p.yyyy === yyyy);
    if (!found) periods.push({ mm, yyyy });
  }
  return { dates, periods };
}



export default Calendar;