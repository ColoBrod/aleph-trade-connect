import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDowntimeErrors } from '~/store/pages/maintenance/working-hours';
import Diagram from '~/components/elements/Diagram';

import { COLOR_3 } from '~/components/elements/Diagram/colors';

const DowntimeErrors = () => {
  const period = 30;
  const header = 'Наиболее популярные ошибки';
  const dispatch = useAppDispatch();
  const { downtimeErrors } = useAppSelector(state => state.pages.maintenance.workingHours);
  const { status, error, data } = downtimeErrors;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchDowntimeErrors()); 
  }, [status])

  if (status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={error} />
    </InfoBlock>
  );

  const labels = data.map(item => item.cause);
  const values = data.map(item => item.time);
  const maxValue = Math.max(...values);
  const maxIndex = values.indexOf(maxValue);
  const maxLabel = labels[maxIndex];

  return (
    <InfoBlock layout='chart-4' header={header}>
      <Diagram 
        id="most-common-issues"
        type="bar"
        direction='horizontal'
        legend={false}
        labels={["Ошибка 1", "Ошибка 2", "Ошибка 3", "Ошибка 4", "Ошибка 5", "Ошибка 6"]}
        datasets={[
          {
            data: [315, 280, 245, 200, 146, 99],
            barThickness: 13,
            backgroundColor: COLOR_3,
          },
        ]}
      />
      <Widget 
        amount={maxLabel}
        description={<>Самая популярная за последние <b>{period}</b> дней</>}
        layout='description'
        align='left'
      />
    </InfoBlock>
  );
}
 
export default DowntimeErrors;