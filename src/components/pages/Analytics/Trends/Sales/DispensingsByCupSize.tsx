import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByCupSize } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';

const DispensingsByCupSize = () => {
  const header = 'Выдачи по размеру чашки (S-M-L)';
  const dispatch = useAppDispatch();
  const { dispensingsByCupSize } = useAppSelector(state => state.pages.analytics.trends.sales);

  useEffect(() => {
    if (dispensingsByCupSize.status === 'idle') dispatch(fetchDispensingsByCupSize()); 
  }, [dispensingsByCupSize.status])

  if (dispensingsByCupSize.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByCupSize.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByCupSize.error} />
    </InfoBlock>
  );

  const cupSize = { S: "Small", M: "Medium", L: "Large" };

  let max: number = 0;
  let mostPopular: string = "";
  let mostPopularInner: string = "cup size...";
  
  const labels: string[] = [];
  const data: number[] = [];
  dispensingsByCupSize.data.forEach(el => {
    if (el.dispensings > max) {
      max = el.dispensings;
      mostPopular = el.cupSize;
    }
    labels.push(el.cupSize);
    data.push(el.dispensings);
  });
  // @ts-ignore
  if (mostPopular in cupSize) mostPopularInner = cupSize[mostPopular];

  return (
    <InfoBlock layout="chart-4" header={header}>
      <Diagram 
        id="dispensings-by-cup-size"
        type="doughnut"
        legend={false}
        labels={labels}
        datasets={[
          { 
            data, 
            backgroundColor: [COLOR_1, COLOR_2, COLOR_3],
            // barThickness: 24,
            
          },
          
        ]}
        doughnutInner={<><span className="cup-size">{mostPopularInner}</span><br /><span className='dispensings'>{max}</span></>}
          // <>{mostPopular}<br>{max}</> 
      />
      <Widget 
        amount={mostPopular}
        description={`Самый популярный размер чашки`}
        layout='chart'
        align='center'
      />
    </InfoBlock>
  );
}

export default DispensingsByCupSize