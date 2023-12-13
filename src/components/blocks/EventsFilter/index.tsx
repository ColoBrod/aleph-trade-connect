import React, { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import Checkbox from '~/components/ui/Checkbox';
import { ErrorType } from '~/services/errors';
import './style.css';

interface Props {
  events: ErrorType[];
  action: Function;
  layout?: "column" | "row";
}

const EventsFilter = ({ events, action, layout = "column" }: Props) => {

  const dispatch = useAppDispatch();

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.currentTarget;
    dispatch(action(id));
  }

  return (
    <div className={`component-events-filter layout-${layout}`}>
      <Checkbox 
        id={'event'} 
        color='event' 
        label={'События'} 
        checked={events.includes('event')} 
        onChange={handleClick} 
        />
      <Checkbox 
        id={'info'} 
        color='info' 
        label={'Информация'} 
        checked={events.includes('info')}  
        onChange={handleClick} 
        />
      <Checkbox 
        id={'maintenance'} 
        color='maintenance' 
        label={'Обслуживание'} 
        checked={events.includes('maintenance')}  
        onChange={handleClick} 
        />
      <Checkbox 
        id={'error'} 
        color='error' 
        label={'Ошибки'} 
        checked={events.includes('error')}  
        onChange={handleClick} 
        />
      <Checkbox 
        id={'tech-info'} 
        color='tech-info' 
        label={'Техническая информация'} 
        checked={events.includes('tech-info')}  
        onChange={handleClick} 
        />
    </div>
  )
}

export default EventsFilter;
