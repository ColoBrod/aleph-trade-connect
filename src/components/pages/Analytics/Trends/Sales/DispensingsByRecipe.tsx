import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByRecipe } from '~/store/pages/analytics/trends/sales';
import Diagram from '~/components/elements/Diagram';
import { COLOR_3 } from '~/components/elements/Diagram/colors';
import { getPeriod } from '~/store/selectors';

const DispensingsByRecipe = () => {
  const { dateRange } = useAppSelector(state => state.filters.analytics.trends);
  const period = getPeriod(dateRange);
  const header = 'По рецептам';
  const dispatch = useAppDispatch();
  const { dispensingsByRecipe } = useAppSelector(state => state.pages.analytics.trends.sales);
  

  useEffect(() => {
    if (dispensingsByRecipe.status === 'idle') dispatch(fetchDispensingsByRecipe()); 
  }, [dispensingsByRecipe.status])

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

  let max: number = 0;
  let mostPopular: string = "";
  const labels: string[] = [];
  const data: number[] = [];
  dispensingsByRecipe.data.forEach(el => {
    if (el.dispensings > max) {
      max = el.dispensings;
      mostPopular = el.recipe;
    }
    labels.push(el.recipe);
    data.push(el.dispensings);
  });

  return (
    <InfoBlock layout="chart-4" header={header}>
      <Diagram 
        id="dispensings-by-recipe"
        type="bar"
        direction='horizontal'
        legend={false}
        labels={labels}
        datasets={[
          { 
            data,
            // 13
            barThickness: 13,
            backgroundColor: COLOR_3,
          },
        ]}
        scales={{
          x: {
            border: { dash: [4, 4] },
          },
          y: {
            grid: { display: false },
          },
        }}
      />
      <Widget 
        amount={mostPopular}
        description={<>Самый популярный рецепт за последние {period}</>}
        layout='dayly-reports'
        align='left'
      />
    </InfoBlock>
  );
}

export default DispensingsByRecipe;