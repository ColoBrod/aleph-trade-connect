import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByWeek } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';

const DispensingsByWeek = () => {
  const header = 'Неделя к неделе';

  const dispatch = useAppDispatch();
  const { dispensingsByWeek } = useAppSelector(state => state.pages.analytics.trends.sales);

  useEffect(() => {
    if (dispensingsByWeek.status === 'idle') dispatch(fetchDispensingsByWeek()); 
  }, [dispensingsByWeek.status])

  if (dispensingsByWeek.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByWeek.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByWeek.error} />
    </InfoBlock>
  );

  const { current, previous } = dispensingsByWeek.data;
  
  // console.log("Current, Previous:", current, previous);

  let diff = Math.abs(100 - (current / previous) * 100).toFixed(0);
  let description;
  if (current > previous) description = "На столько побили предыдущую неделю";
  else if (current < previous) description = "Еще не хватает чтобы побить предыдущую неделю";
  else if (current === previous) description = "Неделя в неделю";

  return (
    <InfoBlock layout="chart-4" header={header}>
      <Diagram 
        id="dispensings-week-to-week"
        type="bar"
        legend={false}
        labels={["Предыдущая", "Текущая"]}
        datasets={[
          {
            data: [previous, current],
            backgroundColor: [COLOR_2, COLOR_1],
            barThickness: 64,
            categoryPercentage: 1,
            // barPercentage: 1,
          },
          // {
          //   data: [previous],
          //   backgroundColor: COLOR_2,
          //   barThickness: 64,
          //   categoryPercentage: 1,
          //   // barPercentage: 1,
          // },
          // {
          //   data: [current],
          //   backgroundColor: COLOR_1,
          //   barThickness: 64,
          //   categoryPercentage: 1,
          //   // barPercentage: 1,
          // },
        ]}
        scales={{
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            border: { dash: [4, 4] },
          }
        }}
      />
      <Widget 
        amount={diff + "%"}
        description={description}
        layout='week-to-week'
        align='center'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByWeek;