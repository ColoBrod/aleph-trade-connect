import React from "react";
import './Monitoring.css';
import EventsFilter from "../EventsFilter";
import { useAppSelector, useAppDispatch } from "~/hooks";
import { eventSet } from '~/store/filters/maintenance/monitoring';
import Button from "~/components/ui/Button";
import UTC_DDL from "~/components/elements/UTC_DDL";
import { utcSet } from "~/store/pages/maintenance/monitoring";

interface Props {

}

const Monitoring = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector(state => state.filters.maintenance.monitoring);
  const { utc } = useAppSelector(state => state.pages.maintenance.monitoring);

  return (
    <div className="modal-box__page modal-box__page-monitoring">
      <div className="modal-box__tabs">
        <EventsFilter events={events} action={eventSet} layout="row" />
      </div>
      <div className="modal-box__filters">
        <Button onClick={e => 1} layout="light">Обновить</Button>
        <UTC_DDL utc={utc} utcSet={utcSet} />
        
      </div>
    </div>
  )
}

export default Monitoring;


