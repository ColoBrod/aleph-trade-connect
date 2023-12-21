import React from "react";
import { useAppSelector } from "~/hooks";
import { ICoffeeMachine } from "~/interfaces/entities";
import Button from "~/components/ui/Button";
import UTC_DDL from "~/components/elements/UTC_DDL";
import EventsFilter from "../EventsFilter";

const EventsHistory = () => {

  const { coffeeMachine } = useAppSelector(state => state.ui.modalBox);

  return (
    <div className="modal-box__page modal-box__page-events-history">
      <div className="modal-box__tabs">
        <EventsFilter events={events} action={eventSet} layout="row" />
      </div>
      <div className="modal-box__filters">
        <Button onClick={e => 1}>Обновить</Button>
        {/* <UTC_DDL utc={utc} utcSet={utcSet} />
        {pagination} */}
      </div>
      <div className="table-wrapper">
        {/* {
          status === 'loading'
            ? <Loader />
            : <Table 
                data={tableContent} 
                keys={tableKeys} 
                handleSort={(key: string): void => {
                  dispatch(orderBySet(key));
                }}
                orderBy={orderBy}
                />
        } */}
      </div>
    </div>
  )
}

export default EventsHistory;


