import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByDate } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';

// import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';

const DispensingsByDate = () => {
  const period = 30;
  const header = 'Напитки по дням';
  const dispatch = useAppDispatch();
  const { dispensingsByDate } = useAppSelector(state => state.pages.analytics.trends.sales);

  useEffect(() => {
    if (dispensingsByDate.status === 'idle') dispatch(fetchDispensingsByDate()); 
  }, [dispensingsByDate.status])

  if (dispensingsByDate.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByDate.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByDate.error} />
    </InfoBlock>
  );

  let total = 0;
  const labels: string[] = [];
  const data: number[] = [];
  dispensingsByDate.data.forEach(el => {
    labels.push(el.date);
    data.push(el.dispensings);
    total += el.dispensings;
  });

  return (
    <InfoBlock layout="chart" header={header}>
      <Diagram 
        id="dispensings-by-date"
        type="line"
        legend={false}
        labels={labels}
        datasets={[
          {
            data: data,
          },
        ]}
        scales={{
          y: { min: 0 },
        }}
        
      />
      <Widget 
        amount={total}
        description={`Приготовлено напитков за последние ${period} дней`}
        layout='chart'
        align='center'
      />
    </InfoBlock>
  );
}

export default DispensingsByDate