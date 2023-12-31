import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByCupSize } from '~/store/pages/analytics/dayly-reports'; 
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';

import imgBeverage40 from './img/beverage-40.svg';
import imgDispensing40 from './img/dispensing-40.svg';
import { getPeriod } from '~/store/selectors';

const DispensingsByCupSize = () => { 
  const header = 'По размеру чашки (S-M-L)';
  const { dateRange } = useAppSelector(state => state.filters.analytics.daylyReports);
  const period = getPeriod(dateRange);
  const dispatch = useAppDispatch();

  const { dispensingsByCupSize } = useAppSelector(state => state.pages.analytics.daylyReports);

  useEffect(() => {
    if (dispensingsByCupSize.status === 'idle') dispatch(fetchDispensingsByCupSize()); 
  }, [dispensingsByCupSize.status]);

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

  const list = dispensingsByCupSize.data;
  const labels = list.map(item => item.cupSize);
  const data = list.map(item => item.dispensings);
  // const height = data.length <= 7 
  //   ? "100%"
  //   : `calc(100% + ${((data.length - 7) * 24)}px)`;
  let maxValue = 0;
  let maxIndex = -1;
  data.forEach((value, i) => {
    if (value > maxValue) {
      maxValue = value;
      maxIndex = i;
    }
  });
  const maxLabel = labels[maxIndex];

  return (
    <InfoBlock layout="chart-7" header={header}>
      <Diagram 
        id="beverages-by-cup-size"
        type="doughnut"
        legend={false}
        labels={labels}
        datasets={[
          {
            data,
            backgroundColor: [COLOR_1, COLOR_2, COLOR_3]
          },
        ]}
        doughnutInner={<>
          <span className="cup-size">{"Medium"}</span><br />
          <span className='dispensings'>{"50%"}</span>
        </>}
      />
      <Widget 
        icon={imgBeverage40}
        amount={maxValue + " раздачи"}
        description={`Были поданы чашки размера Regular за ${period}`}
        layout='dayly-reports-3'
        align='center'
      />
      <Widget 
        icon={imgDispensing40}
        amount={maxLabel}
        description={`Самый популярный рецепт для чашки обычного размера`}
        layout='dayly-reports-3'
        align='center'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByCupSize;