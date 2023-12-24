import React, { useEffect } from "react";
import './Monitoring.css';
import EventsFilter from "../EventsFilter";
import { useAppSelector, useAppDispatch } from "~/hooks";
import { eventSet } from '~/store/filters/maintenance/monitoring';
import UTC_DDL from "~/components/elements/UTC_DDL";
import Pagination from "~/components/elements/Pagination";
import Loader from '~/components/blocks/Loader';
import Table from '~/components/blocks/Table';
import { IRow, fetchEvents, updateTime, utcSet } from '~/store/pages/maintenance/monitoring';
import { ErrorType, error as errorClasses, eventTypes } from '~/services/errors';
import { channel } from '~/services/pusher';
import { IPusherMap } from "~/interfaces/pusher";
import { IRowFmt2, idleSet } from "~/store/pages/modal-box/monitoring";
import { IFiltersOrderBy } from "~/interfaces/filters";
import { activePageSet, orderBySet } from "~/store/filters/modal-box/coffee-machine/monitoring";
import { timezones as tz } from '~/services/timezones';

const Monitoring = () => {
  const dispatch = useAppDispatch();
  const { coffeeMachine } = useAppSelector(state => state.ui.modalBox);
  const { events } = useAppSelector(state => state.filters.maintenance.monitoring);
  // const { utc } = useAppSelector(state => state.pages.maintenance.monitoring);
  const filtersMonitoring = useAppSelector(state => state.filters.modalBox.coffeeMachine.monitoring);
  const { status, error, data, utc } = useAppSelector(state => state.pages.modalBox.monitoring)
  const { errors, coffeeMachines, coffeeMachineModels, coffeeMachineVendors, businessUnits } = useAppSelector(state => state.entities.data);
  const { pagination: { activePage, perPage }, orderBy } = filtersMonitoring;
  const pagesTotal = Math.ceil(data.length / perPage);

  if (!coffeeMachine) return null;

  useEffect(() => {
    channel.bind('map', (data: IPusherMap) => {
      dispatch(idleSet(null));
    });
    return () => { channel.unbind('map'); }
  }, [status])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
      // dispatch(updateTime());
    }
  }, [status])

  useEffect(() => {
    let intervalId: any;
    intervalId = setInterval(() => {
      // dispatch(updateTime())
    }, 10000)
    return () => clearInterval(intervalId)
  }, [])

  // Код ошибки, Описание ошибки, Дата, Время, Длительность
  const formatData = (data: IRow[]): IRowFmt2[] => {
    const fmt = data.map(row => {
      const date = new Date(row.startDateTime);
      // @ts-ignore
      const datetime = date.toLocaleString('ru-RU', { timeZone: tz[utc] });

      const err = errors.find(err => err.code === row.errorCode);
      const errorType = err !== undefined ? err.type : 'unknown';

      return ({
        id: row.id,
        errorCode: row.errorCode,
        errorType,
        errorDesc: row.errorText,
        dateObj: date,
        datetime,
        duration: row.duration,
      })
    })
    return fmt; 
  }

  const sortData = (
    data: IRowFmt2[],
    orderBy: IFiltersOrderBy['orderBy'],
  ): IRowFmt2[] => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      let itemA, itemB;
      // @ts-ignore
      const { column, order } = orderBy;
      if (column === 'datetime') {
        // @ts-ignore
        itemA = new Date(a.dateObj);
        // @ts-ignore
        itemB = new Date(b.dateObj);
      }
      else {
        // @ts-ignore
        itemA = a[column];
        // @ts-ignore
        itemB = b[column];
      }
      if (itemA < itemB) return order === 'desc' ? -1 : 1;
      else if (itemA > itemB) return order === 'desc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  const filterData = (data: IRow[]): IRow[] => {
    return data.filter(row => {
      if (row.coffeeMachineId !== coffeeMachine.id) return false;
      const err = errors.find(err => err.code === row.errorCode);
      const errorType = err ? err.type : null;
      const errorClass = errorType ? errorClasses[errorType] : 'unknown';
      if (errorClass !== 'unknown' && events.includes(errorClass)) return true;
      else return false;
    });
    // return data.filter(row => {
    //   const type = errorType[row.errorCode];
    //   if (events.includes(type)) return true;
    //   else return false;
    // })
  }

  // TODO const filtered =
  const filtered = filterData(data); 
  const fmt = formatData(filtered);
  const sorted = sortData(fmt, orderBy);
  const page = sorted.slice((activePage - 1) * perPage, activePage * perPage);
  const fmtArr = page.map((row: IRowFmt2) => {
    const { errorType } = row;
    const errorClass = errorType !== 'unknown' 
      ? errorClasses[errorType] 
      : 'unknown';
    return [
      <span className={`err-badge err-${errorClass}`}>{row.errorCode}</span>,
      // row.errorCode,
      row.errorDesc,
      row.datetime,
      row.duration,
    ];
  });

  // Код ошибки, Описание ошибки, Дата, Время, Длительность
  const tableContent: (string|number)[][] = [
    ["Код ошибки", "Описание ошибки", "Дата и время", "Длительность"],
    ...fmtArr,
  ];

  const tableKeys: string[] = [
    "errorCode",
    "errorDesc",
    "datetime",
    "duration",
  ];

  const pagination = <Pagination
    handler={
      (pageIndex: number) => {
        dispatch(activePageSet(pageIndex))
      }
    }
    pagesTotal={pagesTotal}
    activePage={activePage}
    />

  return (
    <div className="modal-box__page modal-box__page-monitoring">
      <div className="modal-box__tabs">
        <EventsFilter events={events} action={eventSet} layout="row" />
      </div>
      <div className="modal-box__filters">
        <UTC_DDL utc={utc} utcSet={utcSet} />
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

export default Monitoring;


