import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchDowntimeCauses } from '~/store/pages/maintenance/working-hours';
import Diagram from '~/components/elements/Diagram';

import { COLOR_1, COLOR_2 } from '~/components/elements/Diagram/colors';
import { use_LG_MAX } from '~/media-queries';

const DowntimeCauses = () => {
  const header = 'Причины простоев';
  const dispatch = useAppDispatch();
  const { downtimeCauses } = useAppSelector(state => state.pages.maintenance.workingHours);
  const { status, error, data } = downtimeCauses;
  const lgMax = use_LG_MAX();

  useEffect(() => {
    if (status === 'idle') dispatch(fetchDowntimeCauses()); 
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
  
  const labels: string[] = [];
  const values: number[] = [];
  data.forEach(item => {
    const label = `${item.time}% ${item.cause}`
    labels.push(label);
    values.push(item.time);
  });

  return (
    <InfoBlock layout='downtime-causes' header={header}>
      <Diagram 
        id="downtime-causes"
        type="doughnut"
        legend={false}
        labels={labels}
        datasets={[
          {
            data: values,
            backgroundColor: [COLOR_1, COLOR_2],
          },
        ]}
        doughnutInner={<><span className="cup-size">Обслуживание</span><br /><span className='dispensings'>74%</span></>}
      />
      <Widget 
        layout='downtime-cause'
        amount={data[0]?.time + '%'}
        description={data[0]?.cause}
        align='center'
        />
      <Widget 
        layout='downtime-cause'
        amount={data[1]?.time + '%'}
        description={data[1]?.cause}
        align='center'
        />
    </InfoBlock>
  );
}
 
export default DowntimeCauses;