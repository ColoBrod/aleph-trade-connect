import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByHour } from '~/store/pages/analytics/dayly-reports'; 
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors'

import imgClock from './img/clock.svg';
import imgBeverage from './img/beverage.svg';

const DispensingsByHour = () => {
  const period = 30;
  const header = "Напитки по часам";
  const dispatch = useAppDispatch();

  const { dispensingsByHour } = useAppSelector(state => state.pages.analytics.daylyReports);


  useEffect(() => {
    if (dispensingsByHour.status === 'idle') dispatch(fetchDispensingsByHour()); 
  }, [dispensingsByHour.status]);

  if (dispensingsByHour.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByHour.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByHour.error} />
    </InfoBlock>
  );
  
  const { data: responseData } = dispensingsByHour;
  const data = responseData.map(item => item.dispensings);
  const labels = responseData.map(item => item.hour);

  return (
    <InfoBlock layout="chart-6" header={header}>
      <Diagram 
        id="dispensings-by-hours"
        type="bar"
        direction="vertical"
        legend={false}
        labels={labels}
        datasets={[
          {
            // label: 'Бургер-РУС 3276',
            data,
            barThickness: 26,
            backgroundColor: COLOR_1,
          },
        ]}
        width={'950px'}
        scales={{
          x: {
            grid: {
              display: false
            }
          },
          y: {
            border: { dash: [4, 4] },
          }
        }}
      />
      <Widget 
        icon={imgClock}
        amount={"09:00"}
        description={`Самый популярный час последние ${period} дней`}
        layout='dayly-reports-2'
        align='left'
      />
      <Widget 
        icon={imgBeverage}
        amount={98}
        description={`В среднем трятятся за эти часы. Часы без выдачи исключены`}
        layout='dayly-reports-2'
        align='left'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByHour;