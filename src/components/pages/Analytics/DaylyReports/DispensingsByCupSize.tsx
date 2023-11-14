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

const DispensingsByCupSize = () => { 
  const header = 'Напитки по размеру чашки';
  const period = 30;
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

  return (
    <InfoBlock layout="chart-7" header='Напитки по размеру чашки'>
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
        amount={"2358 раздачи"}
        description={`Были поданы чашки размера Regular за последние ${period} дней`}
        layout='dayly-reports-3'
        align='center'
      />
      <Widget 
        icon={imgDispensing40}
        amount={"Американо 200мл"}
        description={`Самый популярный рецепт для чашки обычного размера`}
        layout='dayly-reports-3'
        align='center'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByCupSize;