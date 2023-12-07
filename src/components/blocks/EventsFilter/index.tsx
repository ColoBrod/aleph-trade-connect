import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import Checkbox from '~/components/ui/Checkbox';

interface Props {
  
}

const EventsFilter = ({ }: Props) => {
  return (
    <div className="component-events-filter">
      <Checkbox id={'event'} color='event' label={'События'} checked={true}  />
      <Checkbox id={'info'} color='info' label={'Информация'} checked={true}  />
      <Checkbox id={'maintenance'} color='maintenance' label={'Обслуживание'} checked={true}  />
      <Checkbox id={'error'} color='error' label={'Ошибки'} checked={true}  />
      <Checkbox id={'tech-info'} color='tech-info' label={'Техническая информация'} checked={true}  />
    </div>
  )
}

export default EventsFilter;
