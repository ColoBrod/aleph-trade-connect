import React, { useState } from 'react';
import './style.css';

const today = new Date();
const current = {
  date: today.getDate(),
  month: today.getMonth(),
  year: today.getFullYear(),
}
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

interface CalendarProps {
  date: Date;
  onChange: Function;
}

const Calendar = (props: CalendarProps) => {
  const { date, onChange: handler } = props;

  const [pickMode, setPickMode] = useState("date");
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  
  const togglePickMode = () => setPickMode(pickMode === 'date' ? 'month' : 'date')
  const years = [...Array(50).keys()].map(index => 2023 + index)

  const curMonth = months[month];
  const curYear = year.toString();

  const monthToDisplay = new Date(year, month);
  const dates = getDates(monthToDisplay);

  return null;
  return (
    <div className="calendar">
      <div className="calendar__selection-row">
        <div className="calendar__month-picker" onClick={togglePickMode}>
          {curMonth}
        </div>
        <div className="calendar__year-picker" onClick={togglePickMode}>
          {curYear}
        </div>
      </div>
      {
        pickMode === 'date' 
          ? <div className="calendar__grid">
              <div className="calendar__grid-inner">
                <span className="calendar__weekday">Пн</span>
                <span className="calendar__weekday">Вт</span>
                <span className="calendar__weekday">Ср</span>
                <span className="calendar__weekday">Чт</span>
                <span className="calendar__weekday">Пт</span>
                <span className="calendar__weekday">Сб</span>
                <span className="calendar__weekday">Вс</span>

                {
                  dates.map(dateObj => {

                    const dd = dateObj.getDate();
                    const mm = dateObj.getMonth();
                    const yyyy = dateObj.getFullYear();
                    
                    const disabled = mm === month
                      ? ''
                      : 'disabled';
                    const active = 
                      dd === date.getDate() && 
                      mm === date.getMonth() && 
                      yyyy === date.getFullYear()
                        ? 'active'
                        : '';
                    // data-date={`${month}/${date}/${year}`}
                    return (
                      <span 
                        key={`${mm}/${dd}/${yyyy}`}
                        onClick={() => handler(dateObj)}
                        className={`calendar__monthday ${disabled} ${active}`}>
                        {dd}
                      </span>
                    );
                  })
                }
              </div>
            </div>
          : null
      }
      {
        pickMode === 'month'
          ? <div className="calendar__scroll-area">
              <div className="calendar__month-area">
                {
                  months.map((m, i) => 
                    <div 
                      key={m} 
                      onClick={() => {
                        setMonth(i);
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
                        setYear(y);
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
          : null
      }
    </div>
  );
}

function getDates(date: Date): Date[] {
  // Устанавливаем первый день месяца
  date = new Date(date);
  date.setDate(1);

  // const status = "idle";
  // switch (status) {
  //   case "idle": 
  //     myFunc()
  //   case "status": return (
  //     asheofuih
  //   );
  //   case "idle": return (

  //   );
  //   case "idle": return (

  //   );
  // }

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

  // console.log(firstDayIndex, lastDayIndex);

  // Устанавливает Понедельник как 0, Вс - 6
  function fmtDayIndex(index: number) {
    index -= 1;
    return index === -1 ? 6 : index;
  }

  const dates: Date[] = [];

  // 
  let d = new Date(date);
  d.setDate(d.getDate() - (firstDayIndex + 1));
  for (let i = 0; i < firstDayIndex; i++) {
    d.setDate(d.getDate() + 1);
    dates.push(new Date(d));
    // dates.unshift(d.toString());
  }

  // d = new Date(date);

  // 
  for (let i = 0; i < lastDay; i++) {
    d.setDate(d.getDate() + 1);
    dates.push(new Date(d));
  }

  // console.log(dates);

  //
  for (let i = lastDayIndex; i < 6; i++) {
    d.setDate(d.getDate() + 1);
    dates.push(new Date(d));
  }

  return dates;
}
 
export default Calendar;