import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByHierarchyLevel } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';
import { getPeriod } from '~/store/selectors';

const AverageDispensingsPerMachine = () => {
  // const period = 30;
  const { dateRange } = useAppSelector(state => state.filters.analytics.trends);
  const period = getPeriod(dateRange);
  // console.log("PERIOD:", dateRange, period);
  const header = `Среднее количество напитков за ${period} на одну машину`;
  const dispatch = useAppDispatch();
  const { dispensingsPerMachineAverage } = useAppSelector(state => state.pages.analytics.trends.overview);

  useEffect(() => {
    if (dispensingsPerMachineAverage.status === 'idle') dispatch(fetchDispensingsByHierarchyLevel()); 
  }, [dispensingsPerMachineAverage.status])

  if (dispensingsPerMachineAverage.status === 'loading') return (
    <InfoBlock layout="single-item" header={header}>
      <Loader />
    </InfoBlock>
  );
  else if (dispensingsPerMachineAverage.status === 'error') return (
    <InfoBlock layout="single-item" header={header}>
      <Error message={dispensingsPerMachineAverage.error} />
    </InfoBlock>
  );

  const data = dispensingsPerMachineAverage.data.map(item => item.value);
  const labels = dispensingsPerMachineAverage.data.map(item => item.name)
  
    // label: item.name, 
  const datasets = [{
    data, 
    label: "Выдачи по машине",
    backgroundColor: COLOR_3,
    barPercentage: 0.6,
  }]

  return(
    <InfoBlock layout="chart-solo" header={header}>
      <Diagram
        id="average-dispensings-per-machine"
        type="bar"
        legend={false}
        labels={labels}
        datasets={datasets}
        direction='horizontal'
        innerBarText={{
          display: true,
          pos: 'left', 
        }}
        scales={{
          x: {
            border: {
              dash: [4,4],
            }
          },
          y: {
            grid: {
              display:false,
            },
            ticks: {
              display: false,
            }
          }
        }}
      />
    </InfoBlock>
  );
}
 
export default AverageDispensingsPerMachine;