import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDowntimeByHour } from '~/store/pages/maintenance/working-hours';
import Diagram from '~/components/elements/Diagram';

import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';
import { use_LG_MAX } from '~/media-queries';

const DowntimeByHours = () => {
  const header = 'Простои по часам';
  const dispatch = useAppDispatch();
  const { downtimeByHour } = useAppSelector(state => state.pages.maintenance.workingHours);
  const { status, error, data } = downtimeByHour;
  const lgMax = use_LG_MAX();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchDowntimeByHour()); 
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
  
  const { currentWeek, previousWeek } = data;
  // const labels: string[] = [];
  // for (let i = 1; 1 <= 24; i++) labels.push(i.toFixed().length < 2 ? `0${i}` : `${i}`);
  // 

  return (
    <InfoBlock layout='chart' header={header}>
      <Diagram
        id="downtime-by-hours"
        type="bar"
        labels={["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "19", "20", "21", "22", "23"]}
        datasets={[
          {
            label: 'Сегодня',
            data: currentWeek,
            backgroundColor: COLOR_1,
            // barThickness: 17,
            barPercentage: 1,
            categoryPercentage: .6,
          },
          {
            label: 'Вчера',
            data: previousWeek,
            backgroundColor: COLOR_2,
            // barThickness: 17,
            barPercentage: 1,
            categoryPercentage: .6,
          },
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
        width={'1150px'}
      />
      <Widget 
        amount={"1ч 32м"} 
        description={<>Сренднее время простоя одной машины <b>сегодня</b></>}
        layout="chart"
      />
      <Widget 
        amount={"2ч 47м"} 
        description={<>Сренднее время простоя одной машины <b>вчера</b></>}
        layout="chart"
      />
    </InfoBlock>
  );
}
 
export default DowntimeByHours;