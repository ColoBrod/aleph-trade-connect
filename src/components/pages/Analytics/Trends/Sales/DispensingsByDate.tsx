import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByDate } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';

import { COLOR_2 } from '~/components/elements/Diagram/colors';
import { getPeriod } from '~/store/selectors';

// import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';

const DispensingsByDate = () => {
  const { dateRange } = useAppSelector(state => state.filters.analytics.trends);
  const period = getPeriod(dateRange);
  // console.log("PERIOD:", dateRange, period);
  // const period = 30;
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
  // Это значение для самой высокой горизонтальной линии
  const maxValue = Math.max(...data) * 1.2;

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
            fill: true,
            borderColor: COLOR_2,
            // @ts-ignore
            backgroundColor: (context) => {
              if (!context?.chart?.chartArea) return;
              const { ctx, data, chartArea: { top, bottom } } = context.chart;
              const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
              gradientBg.addColorStop(0, '#C97917');
              gradientBg.addColorStop(1, 'white');
              return gradientBg;
            }
          },
        ]}
        scales={{
          x: {
            grid: {
              display: false,
            }
          },
          y: { 
            min: 0, 
            max: maxValue,
            border: { dash: [4, 4] },
            grid: {
              // drawTicks: true,
              // tickBorderDash: [8, 4],
            },
          },
        }}
        
      />
      <Widget 
        amount={total}
        description={`Приготовлено напитков за ${period}`}
        layout='chart'
        align='center'
      />
    </InfoBlock>
  );
}

export default DispensingsByDate