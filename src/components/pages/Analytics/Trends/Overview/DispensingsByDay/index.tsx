import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByDay } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';

import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';

const DispensingsByDay = () => {
  const header = 'Напитки по дням';
  const dispatch = useAppDispatch();
  const { dispensingsByDay } = useAppSelector(state => state.pages.analytics.trends.overview);

  useEffect(() => {
    if (dispensingsByDay.status === 'idle') dispatch(fetchDispensingsByDay()); 
  }, [dispensingsByDay.status])

  if (dispensingsByDay.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByDay.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByDay.error} />
    </InfoBlock>
  );

  const { previousWeek, currentWeek } = dispensingsByDay.data;
  const previousWeekTotal = previousWeek.reduce(
    (acc, current) => acc + current,
    0
  );
  const currentWeekTotal = currentWeek.reduce(
    (acc, current) => acc + current,
    0
  );

  return (
    <InfoBlock layout="chart" header={header} >
      <Diagram
        id="dispensings-by-day"
        type="bar"
        labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
        datasets={[
          {
            label: 'Текущая неделя',
            data: currentWeek,
            backgroundColor: COLOR_1,
            barThickness: 22,
            // barPercentage: 0.5,
            // categoryPercentage: 0.5,
          },
          {
            label: 'Предыдущая неделя',
            data: previousWeek,
            backgroundColor: COLOR_2,
            barThickness: 22,
            // barPercentage: 0.5,
            // categoryPercentage: 0.5,
          },
        ]}
        scales={{
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            border: {
              dash: [4, 4],
            }
          },
        }}
      />
      <Widget 
        amount={currentWeekTotal} 
        description="Количество чашек. Текущая неделя."
        layout="chart"
      />
      <Widget 
        amount={previousWeekTotal} 
        description="Количество чашек. Предыдущая неделя."
        layout="chart"
      />
    </InfoBlock>
  );
}
 
export default DispensingsByDay;