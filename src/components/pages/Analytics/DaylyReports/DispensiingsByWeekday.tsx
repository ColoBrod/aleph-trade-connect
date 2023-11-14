import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByWeekday } from '~/store/pages/analytics/dayly-reports'; 
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';
import imgCalendar from './img/calendar.svg'
import imgBeverage from './img/beverage.svg'

const DispensingsByWeekday = () => { 
  const header = 'Напитки по дням';
  const period = 30;
  const dispatch = useAppDispatch();

  const { dispensingsByWeekday } = useAppSelector(state => state.pages.analytics.daylyReports);

  useEffect(() => {
    if (dispensingsByWeekday.status === 'idle') dispatch(fetchDispensingsByWeekday()); 
  }, [dispensingsByWeekday.status]);

  if (dispensingsByWeekday.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByWeekday.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByWeekday.error} />
    </InfoBlock>
  );

  const { mon, tue, wed, thu, fri, sat, sun } = dispensingsByWeekday.data;
  // const labels = list.map(item => item.name);
  // const data = list.map(item => item.dispensings);
  // const height = data.length <= 7 
  //   ? "100%"
  //   : `calc(100% + ${((data.length - 7) * 24)}px)`;

  return (
    <InfoBlock layout="chart-6" header={header}>
      <Diagram 
        id="dispensings-by-days"
        type="bar"
        direction="horizontal"
        legend={false}
        labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
        datasets={[
          {
            // label: 'Бургер-РУС 3276',
            data: [mon, tue, wed, thu, fri, sat, sun],
            barThickness: 12,
            backgroundColor: COLOR_1,
          },
        ]}
        scales={{
          y: {
            grid: {
              display: false
            }
          },
          x: {
            border: { dash: [4, 4] },
          }
        }}
      />
      <Widget 
        icon={imgCalendar}
        amount={"Вторник"}
        description={`Самый популярный день за рассматриваемые ${period} дней`}
        layout='dayly-reports-2'
        align='left'
      />
      <Widget 
        icon={imgBeverage}
        amount={"337 раздач"}
        description={`Обслужили в среднем за день`}
        layout='dayly-reports-2'
        align='left'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByWeekday;