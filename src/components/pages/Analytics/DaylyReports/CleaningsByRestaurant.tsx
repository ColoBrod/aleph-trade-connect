import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchCleaningsByRestaurant } from '~/store/pages/analytics/dayly-reports'; 
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors'

const CleaningsByRestaurant = () => {
  const period = 30;
  const header = "Соблюдение правил чистки ресторанами";
  const dispatch = useAppDispatch();

  const { cleaningsByRestaurant } = useAppSelector(state => state.pages.analytics.daylyReports);

  useEffect(() => {
    if (cleaningsByRestaurant.status === 'idle') dispatch(fetchCleaningsByRestaurant()); 
  }, [cleaningsByRestaurant.status]);

  if (cleaningsByRestaurant.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (cleaningsByRestaurant.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={cleaningsByRestaurant.error} />
    </InfoBlock>
  );
  
  const { data: responseData } = cleaningsByRestaurant;
  const data = responseData.map(item => item.cleanings);
  const labels = responseData.map(item => item.name);

  return (
    <InfoBlock layout="chart-5" header={header}>
      <Diagram 
        id="cleanings-by-rest"
        type="bar"
        direction="horizontal"
        legend={false}
        labels={labels}
        datasets={[
          {
            // label: 'Бургер-РУС 3276',
            data,
            barThickness: 13,
            backgroundColor: COLOR_3,
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
        amount={"Бургер-РУС 3276"}
        description={`Самый недисциплинированный ресторан за последние ${period} дней`}
        layout='dayly-reports'
        align='left'
      />
    </InfoBlock>
  );
}
 
export default CleaningsByRestaurant;