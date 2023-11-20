import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByWeekdayAndTime, timeSet } from '~/store/pages/analytics/trends/sales';
import TimeRange from '~/components/elements/TimeRange/index'; 
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';

const weekFullName = {
  "Пн": "Понедельник", 
  "Вт": "Вторник", 
  "Ср": "Среда", 
  "Чт": "Четверг", 
  "Пт": "Пятница", 
  "Сб": "Суббота", 
  "Вс": "Воскресенье",
}

const DispensingsByWeekdayAndTime = () => {
  const period = 30;
  const header = 'Выдачи по дню недели и времени';
  const dispatch = useAppDispatch();
  const { dispensingsByWeekdayAndTime } = useAppSelector(state => state.pages.analytics.trends.sales);
  // const { timeStart, timeEnd } = dispensingsByWeekdayAndTime.filters;
  const { timeStart, timeEnd } = useAppSelector(state => state.pages.analytics.trends.sales.dispensingsByWeekdayAndTime.filters);


  useEffect(() => {
    if (dispensingsByWeekdayAndTime.status === 'idle') dispatch(fetchDispensingsByWeekdayAndTime()); 
  }, [dispensingsByWeekdayAndTime.status])

  if (dispensingsByWeekdayAndTime.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByWeekdayAndTime.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByWeekdayAndTime.error} />
    </InfoBlock>
  );

  const dispensings = dispensingsByWeekdayAndTime.data;
  const filtered = {};
  const day = Object.keys(dispensings);
  // const timeStart = 0;
  // const timeEnd = 5;


  const mon = dispensings.mon.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const tue = dispensings.tue.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const wed = dispensings.wed.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const thu = dispensings.thu.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const fri = dispensings.fri.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const sat = dispensings.sat.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const sun = dispensings.sun.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);

  const data = [mon, tue,  wed,  thu,  fri,  sat,  sun];

  const total = data.reduce((acc, current) => acc + current, 0);
  const maxValue = Math.max(...data);
  const maxIndex = data.indexOf(maxValue);
  const bestDay = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][maxIndex]

  return (
    <InfoBlock layout="chart-timerange" header={header}>
      <Diagram 
        id="dispensings-by-weekday-and-time"
        type="bar"
        legend={false}
        labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
        datasets={[
          { 
            data: data,
            barThickness: 29,
            backgroundColor: COLOR_2,
          },
        ]}
        scales={{
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            border: { dash: [4, 4] },
          }
        }}
      />
      <Widget 
        // @ts-ignore
        amount={weekFullName[bestDay]}
        description={<>Самый популярный день недели за последние <b>{period}</b> дней</>}
        layout='chart-doughnut'
        align='center'
      />
      <Widget 
        amount={total}
        description={<>Выдач всего</>}
        layout='chart-doughnut'
        align='center'
      />
      <TimeRange />
    </InfoBlock>
  )

}

export default DispensingsByWeekdayAndTime;