import React, { ReactNode, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/hooks";
import { ICoffeeMachine } from "~/interfaces/entities";
import Button from "~/components/ui/Button";
import UTC_DDL from "~/components/elements/UTC_DDL";
import EventsFilter from "../EventsFilter";
import Table from "~/components/blocks/Table";
import Loader from "~/components/blocks/Loader";
import { eventSet } from '~/store/filters/maintenance/monitoring';
import { activePageSet, orderBySet, rowsPerPageSet } from '~/store/filters/modal-box/coffee-machine/events-history';
import { fetchEventsHistory, utcSet, idleSet } from "~/store/pages/modal-box/events-history";
import { timezones as tz } from '~/services/timezones';
import { error as errorClasses } from '~/services/errors';
import Pagination from "~/components/elements/Pagination";
import DropDownList from "~/components/ui/DropDownList";

interface Row {
  errorCode: string | ReactNode;
  errorDesc: string;
  dateObj: Date;
  datetime: string;
  utc: string;
  duration: string;
}

type RowFmt = (string|ReactNode)[];

const EventsHistory = () => {
  const dispatch = useAppDispatch();
  const { coffeeMachine } = useAppSelector(state => state.ui.modalBox);
  const { events } = useAppSelector(state => state.filters.maintenance.monitoring);
  const { status, error, eventsHistory, utc } = useAppSelector(state => state.pages.modalBox.eventsHistory);
  const filters = useAppSelector(state => state.filters.modalBox.coffeeMachine.eventsHistory);
  const { orderBy, pagination: { activePage, perPage } } = filters;
  const { errors } = useAppSelector(state => state.entities.data);
  const pagesTotal = Math.ceil(eventsHistory.length / perPage);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEventsHistory());
    }
  }, [status])

  const tableKeys = [
    'errodCode', 'errorDesc', 'datetime', 'utc', 'duration'
  ]

  const pagination = <Pagination
    handler={
      (pageIndex: number) => {
        dispatch(activePageSet(pageIndex))
      }
    }
    pagesTotal={pagesTotal}
    activePage={activePage}
    />

  const ddl = <DropDownList 
    onChange={(e) => {
      const value = parseInt(e.currentTarget.value);
      dispatch(activePageSet(1));
      dispatch(rowsPerPageSet(value));
      dispatch(idleSet({}))
      // dispatch(activePageSet(1));
      // dispatch(rowsPerPageSet(value));
      // dispatch(idleSet({}))
    }} 
    value={"10"} //perPage.toString()
    label="Показать по" 
    name='pages' 
    items={[
      { value: "10", innerHTML: "10" },
      { value: "20", innerHTML: "20" },
      { value: "50", innerHTML: "50" },
    ]} 
    />

  const filterData = (data: Row[]): Row[] => {
    return data.filter(row => {
      const err = errors.find(err => err.code === row.errorCode);
      const errorType = err ? err.type : null;
      const errorClass = errorType ? errorClasses[errorType] : 'unknown';
      if (errorClass !== 'unknown' && events.includes(errorClass)) return true;
      else return false;
    });
  }

  const rows = eventsHistory.map((row): Row => {
    const date = new Date(row.datetime);
    // @ts-ignore
    const datetime = date.toLocaleString('ru-RU', { timeZone: tz[row.utc] });

    return ({
      errorCode: row.errorCode,
      errorDesc: row.errorDesc,
      dateObj: date,
      datetime: row.datetime,
      utc: row.utc,
      duration: row.duration,
    });
  });

  const filtered = filterData(rows);

  const rowsFmt = filtered.map((row): RowFmt => {

    const err = errors.find(err => err.code === row.errorCode);
    const errorType = err ? err.type : null;
    const errorClass = errorType ? errorClasses[errorType] : 'unknown';
    return [
      <span className={`err-badge err-${errorClass}`}>{row.errorCode}</span>,
      row.errorDesc,
      row.datetime,
      row.utc,
      row.duration,
    ];
  });

  const tableContent = [
    ["Код ошибки", "Описание ошибки", "Дата/Время", "UTC+", "Длительность"], 
    ...rowsFmt
  ];

  return (
    <div className="modal-box__page modal-box__page-events-history">
      <div className="modal-box__tabs">
        <EventsFilter events={events} action={eventSet} layout="row" />
      </div>
      <div className="modal-box__filters">
        <Button onClick={e => 1}>Обновить</Button>
        <UTC_DDL utc={utc} utcSet={utcSet} />
        {ddl}
        {pagination}
      </div>
      <div className="table-wrapper">
        {
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
        }
      </div>
    </div>
  )
}

export default EventsHistory;


