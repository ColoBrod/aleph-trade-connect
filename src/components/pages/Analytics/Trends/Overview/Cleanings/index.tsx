import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchCleanings } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';

import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';

const Cleanings = () => {
  const header = 'Чистки';
  const dispatch = useAppDispatch();
  const { cleanings } = useAppSelector(state => state.pages.analytics.trends.overview);

  useEffect(() => {
    if (cleanings.status === 'idle') dispatch(fetchCleanings()); 
  }, [cleanings.status])

  if (cleanings.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (cleanings.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={cleanings.error} />
    </InfoBlock>
  );

  const { previousWeek, currentWeek } = cleanings.data;
  console.log([currentWeek])

  return(
    <InfoBlock layout="chart" header={header}>
      <Diagram
        id="cleanings"
        type="bar"
        labels={["Читски"]}
        legend={false}
        datasets={[
          {
            label: 'Текущая неделя',
            data: [currentWeek],
            backgroundColor: COLOR_1,
            maxBarThickness: 102,
            categoryPercentage: 0.6,
          },
          {
            label: 'Предыдущая неделя',
            data: [previousWeek],
            backgroundColor: COLOR_2,
            maxBarThickness: 102,
            categoryPercentage: 0.6,
          },
        ]}
        scales={{
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            border: {
              dash: [4, 4],
            }
          }
        }}
      />
      <Widget 
        amount={currentWeek} 
        toFixed={true}
        description="Чистка машины в день. Текущая неделя"
        layout="chart"
      />
      <Widget 
        amount={previousWeek} 
        toFixed={true}
        description="Чистка машины в день. Предыдущая неделя"
        layout="chart"
      />
    </InfoBlock>
  );
}
 
export default Cleanings;