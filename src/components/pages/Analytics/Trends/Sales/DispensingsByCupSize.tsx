import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByCupSize } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';

const DispensingsByCupSize = () => {
  const period = 30;
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

  let max: number = 0;
  let mostPopular: string = "";
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

  return (
    <InfoBlock layout="chart-4" header=''>
      <Diagram 
        id="dispensings-by-cup-size"
        type="doughnut"
        legend={false}
        labels={labels}
        datasets={[
          { data },
        ]}
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