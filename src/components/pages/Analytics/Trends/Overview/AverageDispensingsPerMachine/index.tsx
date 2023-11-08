import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDispensingsByHierarchyLevel } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';

const AverageDispensingsPerMachine = () => {
  const header = 'Среднее количество напитков на одну машину';
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

  const datasets = dispensingsPerMachineAverage.data.map((item, i) => ({ label: item.name, data: [item.value], backgroundColor: [COLOR_1, COLOR_2, COLOR_3][i] }));
  //Среднее количество...
  return(
    <InfoBlock layout="chart-solo" header={header}>
      <Diagram
        id="average-dispensings-per-machine"
        type="bar"
        labels={[""]}
        datasets={datasets}
        direction='horizontal'
      />
    </InfoBlock>
  );
}
 
export default AverageDispensingsPerMachine;