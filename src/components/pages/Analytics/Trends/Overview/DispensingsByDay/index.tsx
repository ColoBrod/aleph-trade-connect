import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByDay } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';

const DispensingsByDay = () => {
  const header = 'Расход ингридиентов';
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