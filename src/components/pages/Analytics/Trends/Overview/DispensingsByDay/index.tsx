import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByDay } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';

import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';
import { use_LG_MAX } from '~/media-queries';

const DispensingsByDay = () => {
  const header = 'Напитки по дням';
  const dispatch = useAppDispatch();
  const { dispensingsByDay } = useAppSelector(state => state.pages.analytics.trends.overview);
  const lgMax = use_LG_MAX();

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
    <InfoBlock layout={ lgMax ? "chart-6" : "chart"} header={header} >
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
          },
          {
            label: 'Предыдущая неделя',
            data: previousWeek,
            backgroundColor: COLOR_2,
            barThickness: 22,
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
        description="Количество чашек. Текущая неделя"
        layout={ lgMax ? 'chart-small' : 'chart' }
        align={ lgMax ? 'left' : 'center' }
      />
      <Widget 
        amount={previousWeekTotal} 
        description="Количество чашек. Предыдущая неделя"
        layout={ lgMax ? 'chart-small' : 'chart' }
        align={ lgMax ? 'left' : 'center' }
      />
    </InfoBlock>
  );
}
 
export default DispensingsByDay;