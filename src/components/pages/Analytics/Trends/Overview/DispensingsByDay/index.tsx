/**
 * Это обертка для инфо-блока, отвечающего за отрисовку графика
 * Связывает запрос к API и репрезентативные компоненты: 
 * InfoBlock, Diagram, Widget, Loader
 */

import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';
import Loader from '~/components/blocks/Loader';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { loadDispensingsByDay } from '~/store/pages/analytics/trends/overview';

const DispensingsByDay = () => {
  return null;

  const header = 'Напитки по дням'
  const dispatch = useAppDispatch();
  const dispensingsByDay = useAppSelector(
    (state) => state.overview.dispensingsByDay
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
  

  useEffect(() => {
    // @ts-ignore
    dispatch(loadDispensingsByDay());
  }, [dispatch]);

  if (dispensingsByDay.status === 'loading') return (
    <InfoBlock layout="chart-solo" header={header} >
      <Loader />
    </InfoBlock>
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
          },
          {
            label: 'Предыдущая неделя',
            data: previousWeek,
          },
        ]}
      />
      <Widget 
        amount={currentWeekTotal} 
        description="Выдач за текущую неделю"
        layout="chart"
      />
      <Widget 
        amount={previousWeekTotal} 
        description="Выдач за предыдущую неделю"
        layout="chart"
      />
    </InfoBlock>
  );
}
 
export default DispensingsByDay;