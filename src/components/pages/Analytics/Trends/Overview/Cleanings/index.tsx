import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchCleanings } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';

const Cleanings = () => {
  const header = 'Чистки';
  const dispatch = useAppDispatch();
  const { cleanings } = useAppSelector(state => state.pages.analytics.trends.overview);

  useEffect(() => {
    if (cleanings.status === 'idle') dispatch(fetchCleanings()); 
  }, [cleanings.status])

  if (cleanings.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (cleanings.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={cleanings.error} />
    </InfoBlock>
  );

  const { previousWeek, currentWeek } = cleanings.data;

  return(
    <InfoBlock layout="chart" header={header}>
      <Diagram
        id="cleanings"
        type="bar"
        labels={["Читски"]}
        datasets={[
          {
            label: 'Текущая неделя',
            data: [currentWeek],
          },
          {
            label: 'Предыдущая неделя',
            data: [previousWeek],
          },
        ]}
      />
      <Widget 
        amount={currentWeek} 
        toFixed={true}
        description="Чистки за текущую неделю"
        layout="chart"
      />
      <Widget 
        amount={previousWeek} 
        toFixed={true}
        description="Чистки за предыдущую неделю"
        layout="chart"
      />
    </InfoBlock>
  );
}
 
export default Cleanings;