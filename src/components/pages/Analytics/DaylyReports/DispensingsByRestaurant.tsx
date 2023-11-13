import React, { useEffect } from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Loader from '~/components/blocks/Loader';
import Error from '~/components/blocks/Error'

import { useAppDispatch, useAppSelector } from '~/hooks';
// import { fetchDispensingsByHierarchyLevel } from '~/store/pages/analytics/trends/overview';
import Diagram from '~/components/elements/Diagram';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors'


const DispensingsByRestaurant = () => {
  const header = "";
  const dispatch = useAppDispatch();
  // const { varName } = useAppSelector(state => state.pages)
  // 

  // useEffect(() => {
  //   if (varName.status === 'idle') dispatch(fetchDispensingsByHierarchyLevel()); 
  // }, [varName.status]

  // if (dispensingsPerMachineAverage.status === 'loading') return (
  //   <InfoBlock layout="single-item" header={header}>
  //     <Loader />
  //   </InfoBlock>
  // );
  // else if (dispensingsPerMachineAverage.status === 'error') return (
  //   <InfoBlock layout="single-item" header={header}>
  //     <Error message={dispensingsPerMachineAverage.error} />
  //   </InfoBlock>
  // );

  return (
    <></>
  );
}
 
export default DispensingsByRestaurant;