import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByPath } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';
import { COLOR_3 } from '~/components/elements/Diagram/colors';

const DispensingsByPath = () => {
  const period = 30;
  const header = 'Выдачи по рецептам';
  const dispatch = useAppDispatch();
  const { dispensingsByPath } = useAppSelector(state => state.pages.analytics.trends.sales);
  

  useEffect(() => {
    if (dispensingsByPath.status === 'idle') dispatch(fetchDispensingsByPath()); 
  }, [dispensingsByPath.status])

  if (dispensingsByPath.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByPath.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByPath.error} />
    </InfoBlock>
  );

  const labels = dispensingsByPath.data.map(el => el.name);
  const data = dispensingsByPath.data.map(el => el.dispensings);
  const maxValue = Math.max(...data);
  const maxIndex = data.indexOf(maxValue);
  const bestPath = labels[maxIndex];

  return (
    <InfoBlock layout="chart-4" header='Выдачи по городам'>
      <Diagram 
        id="dispensings-by-business-unit"
        type="bar"
        direction='horizontal'
        legend={false}
        labels={labels}
        datasets={[
          { 
            data,
            backgroundColor: COLOR_3,
            barThickness: 36,
          },
        ]}
        scales={{
          y: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            }
          },
          x: { 
            min: 0, 
            border: { dash: [4, 4] },
          },
        }}
        innerBarText={{
          display: true,
        }}
      />
      <Widget 
        amount={bestPath}
        description={<>Performs best within the last <b>{period}</b> days</>}
        layout='description'
        align='center'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByPath;