import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByRestaurant } from '~/store/pages/analytics/dayly-reports'; 
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors'

const DispensingsByRestaurant = () => { 
  const header = 'Напитки по ресторанам';
  const period = 30;
  const dispatch = useAppDispatch();

  const { dispensingsByRestaurant } = useAppSelector(state => state.pages.analytics.daylyReports);
  const filters = useAppSelector(state => state.filters.analytics.daylyReports);

  useEffect(() => {
    if (dispensingsByRestaurant.status === 'idle') dispatch(fetchDispensingsByRestaurant()); 
  }, [dispensingsByRestaurant.status]);

  if (dispensingsByRestaurant.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByRestaurant.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByRestaurant.error} />
    </InfoBlock>
  );

  const { data: list } = dispensingsByRestaurant;
  const labels = list.map(item => item.name);
  const data = list.map(item => item.dispensings);
  const height = data.length <= 7 
    ? "100%"
    : `calc(100% + ${((data.length - 7) * 24)}px)`;

  return (
    <InfoBlock layout="chart-5" header={header}>
      <Diagram 
        id="dispensings-by-rest"
        type="bar"
        direction="horizontal"
        legend={false}
        labels={labels}
        datasets={[
          {
            // label: 'Бургер-РУС 3276',
            data,
            barThickness: 18,
            backgroundColor: COLOR_2,
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
        responsive={true}
        height={height}
        // scroll
      />
      <Widget 
        amount={"Бургер-РУС 3276"}
        description={`Лучшие рестораны за последние ${period} дней`}
        layout='dayly-reports'
        align='left'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByRestaurant;