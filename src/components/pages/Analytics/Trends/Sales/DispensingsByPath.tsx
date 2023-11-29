import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByPath } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';
import { COLOR_3 } from '~/components/elements/Diagram/colors';
import { IBusinessUnit } from '~/interfaces/entities';

const DispensingsByPath = () => {
  const period = 30;
  const dispatch = useAppDispatch();
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const { dispensingsByPath } = useAppSelector(state => state.pages.analytics.trends.sales);
  const header = getHeaderByHierarchy(businessUnits);

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
    <InfoBlock layout="chart-4" header={header}>
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
          pos: 'left',
        }}
      />
      <Widget 
        amount={bestPath}
        description={<>Performs best within the last <b>{period}</b> days</>}
        layout='dayly-reports'
        align='left'
      />
    </InfoBlock>
  );
}

function getHeaderByHierarchy(businessUnits: IBusinessUnit[]): string {
  let heighest: number = -1;
  businessUnits.forEach((bu) => {
    if (bu.type > heighest) heighest = bu.type;
  })
  switch (heighest) {
    case 0: return 'По ресторанам';
    case 1: return 'По городам';
    case 2: return 'По субъектам';
    case 3: return 'По федеральным округам';
    default: return "";
  }
}
 
export default DispensingsByPath;