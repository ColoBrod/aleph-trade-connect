import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchConsumptions } from '~/store/pages/analytics/trends/overview';
import { getPeriod } from '~/store/selectors';

import imgCoffee from './img/coffee.png';
import imgMilk from './img/milk.png';
import imgWater from './img/water.png';
import imgChocolate from './img/chocolate.png';

const Consumptions = () => {
  const { dateRange } = useAppSelector(state => state.filters.analytics.trends);
  const period = getPeriod(dateRange);
  const dispatch = useAppDispatch();
  const { consumptions } = useAppSelector(state => state.pages.analytics.trends.overview);

  // TODO - разобраться во втором параметре функции. Зачем мы передаем оба...
  useEffect(() => {
    if (consumptions.status === 'idle') dispatch(fetchConsumptions()); 
  }, [consumptions.status]) // dispatch

  if (consumptions.status === 'loading') return (
    <InfoBlock layout="single-item" header='Расход ингридиентов'>
      <Loader />
    </InfoBlock>
  );
  else if (consumptions.status === 'error') return (
    <InfoBlock layout="single-item" header='Расход ингридиентов'>
      <Error message={consumptions.error} />
    </InfoBlock>
  );

  const { water, milk, coffee, chocolate } = consumptions.data;

  return (
    <InfoBlock layout="grid-2x2" header='Расход ингридиентов' className='analytics__trends__consumptions'>
      <Widget 
        icon={imgWater}
        amount={water} 
        toFixed={true}
        description={<>Литров воды за {period}</>}
        layout="dashboard"
      />
      <Widget 
        icon={imgMilk}
        amount={milk} 
        toFixed={true}
        description={<>Литров молока за {period}</>}
        layout="dashboard"
      />
      <Widget 
        icon={imgCoffee}
        amount={coffee} 
        toFixed={true}
        description={<>Килограмм кофе за {period}</>}
        layout="dashboard"
      />
      <Widget 
        icon={imgChocolate}
        amount={chocolate} 
        toFixed={true}
        description={<>Килограмм шоколада за {period}</>}
        layout="dashboard"
      />
    </InfoBlock>
  );
}
 
export default Consumptions;