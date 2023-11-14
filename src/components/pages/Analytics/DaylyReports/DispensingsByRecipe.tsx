import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error'

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByRecipe } from '~/store/pages/analytics/dayly-reports'; 
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';

import imgBeverage from './img/beverage.svg';

const DispensingsByRecipe = () => { 
  const header = 'Напитки по рецепту';
  const period = 30;
  const dispatch = useAppDispatch();

  const { dispensingsByRecipe } = useAppSelector(state => state.pages.analytics.daylyReports);

  useEffect(() => {
    if (dispensingsByRecipe.status === 'idle') dispatch(fetchDispensingsByRecipe()); 
  }, [dispensingsByRecipe.status]);

  if (dispensingsByRecipe.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsByRecipe.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsByRecipe.error} />
    </InfoBlock>
  );

  const list = dispensingsByRecipe.data;
  const labels = list.map(item => item.recipe);
  const data = list.map(item => item.dispensings);
  // const height = data.length <= 7 
  //   ? "100%"
  //   : `calc(100% + ${((data.length - 7) * 24)}px)`;

  return (
    <InfoBlock layout="chart-6" header={header}>
      <Diagram 
        id="dispensings-by-recipe"
        type="bar"
        direction="horizontal"
        legend={false}
        labels={labels}
        datasets={[
          {
            data,
            barThickness: 13,
            backgroundColor: COLOR_2,
          },
        ]}
        scales={{
          y: {
            grid: {
              display: false
            }
          },
          x: {
            border: { dash: [4, 4] },
          }
        }}
        responsive={true}
        height='100%'
      />
      <Widget 
        icon={imgBeverage}
        amount={"Американо 200мл"}
        description={`Самый популярный рецепт за последние ${period} дней`}
        layout='dayly-reports-2'
        align='left'
      />
    </InfoBlock>
  );
}
 
export default DispensingsByRecipe;