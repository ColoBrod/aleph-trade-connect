import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDowntimeByWeekday, timeSet } from '~/store/pages/maintenance/working-hours';
import Diagram from '~/components/elements/Diagram';

import { COLOR_2 } from '~/components/elements/Diagram/colors';
import TimeRange from '~/components/elements/TimeRange';
import { getPeriod } from '~/store/selectors';

const weekFullName = {
  "Пн": "Понедельник", 
  "Вт": "Вторник", 
  "Ср": "Среда", 
  "Чт": "Четверг", 
  "Пт": "Пятница", 
  "Сб": "Суббота", 
  "Вс": "Воскресенье",
}

const DowntimeByWeekdayAndTime = () => {
  const { dateRange } = useAppSelector(state => state.filters.maintenance.workingHours);
  const period = getPeriod(dateRange);
  
  const header = 'Простои по дням';
  const dispatch = useAppDispatch();
  const { downtimeByWeekday } = useAppSelector(state => state.pages.maintenance.workingHours);
  const { timeStart, timeEnd } = useAppSelector(state => state.pages.maintenance.workingHours.downtimeByWeekday.filters);
  const { status, error, data } = downtimeByWeekday;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchDowntimeByWeekday()); 
  }, [status])

  if (status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );

  else if (status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={error} />
    </InfoBlock>
  );

  const filtered = {};
  const day = Object.keys(data);

  const mon = data.mon.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const tue = data.tue.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const wed = data.wed.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const thu = data.thu.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const fri = data.fri.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const sat = data.sat.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);
  const sun = data.sun.reduce((acc, current, i) => i >= timeStart && i < timeEnd ? acc + current : acc, 0);

  const values = [mon, tue,  wed,  thu,  fri,  sat,  sun];
  const total = values.reduce((acc, current) => acc + current, 0);
  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const bestDay = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][maxIndex]

  return (
    <InfoBlock layout='chart-timerange' header={header}>
      <Diagram 
        id="downtimes-by-weekday-and-time"
        type="bar"
        legend={false}
        labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
        datasets={[
          {
            data: values,
            barThickness: 40,
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
        description={<>Наиболее популярный день недели за {period}</>}
        layout='chart-doughnut'
        align='center'
      />
      <Widget 
        amount={total + " сек"}
        toFixed={true}
        description={<>простоя всего</>}
        layout='chart-doughnut'
        align='center'
      />
      <TimeRange 
        timeStart={timeStart}
        timeEnd={timeEnd}
        action={timeSet}
        />
    </InfoBlock>
  );
}
 
export default DowntimeByWeekdayAndTime;