import React, { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { channel } from '~/services/pusher';
import { coffeeMachineSet, visibilitySet } from '~/store/ui/modal-box';

import './style.css';
import DropDownList from '~/components/ui/DropDownList';
import Table from '~/components/blocks/Table';

import FiltersAside from '~/components/blocks/FiltersAside';

import Loader from '~/components/blocks/Loader';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { rowsPerPageSet, activePageSet, orderBySet } from '~/store/filters/maintenance/monitoring';
import RegionTree from '~/components/blocks/RegionTree';
import { fetchEvents, updateTime, utcSet } from '~/store/pages/maintenance/monitoring';

import { 
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
} from '~/store/filters/maintenance';
import Pagination from '~/components/elements/Pagination';

import { IRow, IRowFmt, idleSet } from '~/store/pages/maintenance/monitoring';
import { eventSet } from '~/store/filters/maintenance/monitoring';
import { IFiltersOrderBy } from '~/interfaces/filters';
import { IPusherMap } from '~/interfaces/pusher';
import EventsFilter from '~/components/blocks/EventsFilter';

import { ErrorType, error as errorClasses, eventTypes } from '~/services/errors';
import FiltersAsideButton from '~/components/elements/FiltersAsideButton';
import UTC_DDL from '~/components/elements/UTC_DDL';
import { IBusinessUnit } from '~/interfaces/entities';
import { timezones as tz } from '~/services/timezones';

const Monitoring = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filtersMonitoring = useAppSelector(state => state.filters.maintenance.monitoring);
  const { status, error, data, utc } = useAppSelector(state => state.pages.maintenance.monitoring)
  // const { orderBy } =
  const { coffeeMachines, coffeeMachineModels, coffeeMachineVendors, businessUnits, errors } = useAppSelector(state => state.entities.data);
  const {
    businessUnits: filtersBusinessUnits
  } = useAppSelector(state => state.filters.maintenance.shared);
  // const {  } = useAppSelector(state => state.filters.maintenance.monitoring);

  const { pagination: { activePage, perPage }, orderBy, events } = filtersMonitoring;
  const pagesTotal = Math.ceil(data.length / perPage);
  // const { pathname } = useLocation();

  useEffect(() => {
    if (type === 'all') {
      const json = localStorage.getItem('filters/maintenance/monitoring/events');
      const eventList = json ? JSON.parse(json) : eventTypes;
      dispatch(eventSet(eventList));
    }
    // @ts-ignore
    else if (eventTypes.includes(type)) dispatch(eventSet([type]))
  }, [type])

  useEffect(() => {
    if (events.length > 1 && type !== 'all') navigate('/maintenance/monitoring/all');
  }, [events.length])

  useEffect(() => {
    channel.bind('map', (data: IPusherMap) => {
      dispatch(idleSet(null));
    });
    return () => { channel.unbind('map'); }
  }, [status])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
      dispatch(updateTime());
    }
  }, [status])
  
  useEffect(() => {
    let intervalId: any;
    intervalId = setInterval(() => {
      dispatch(updateTime());
    }, 10000)
    return () => clearInterval(intervalId)
  }, [])

  const regionTree = <RegionTree 
    actions={{
      businessUnitsSet,
      businessUnitsExpanded,
      businessUnitsFilterChanged,
      businessUnitsSelectedAll,
    }}
    items={businessUnits}
    selector={filtersBusinessUnits}
  />
  
  const eventsFilter = <EventsFilter events={events} action={eventSet} />;

  const formatData = (data: IRow[]): IRowFmt[] => {
    const fmt = data.map(row => {
      // const match = row.company.match(/.*, (.*)/);
      // const path = match === null ? row.company : match[1];
      // const [date, time] = row.start_datetime.split(" ") as [string, string];
      const date = new Date(row.startDateTime);
      const cm = coffeeMachines.find(cm => cm.id === row.coffeeMachineId); 
      const model = coffeeMachineModels.find(m => m.id === cm?.modelId);
      // @ts-ignore
      const vendor = coffeeMachineVendors.find(v => v.id === model?.vendorId);
      // @ts-ignore
      const bu = businessUnits.find(b => b.id === cm?.restaurantId);
      //   // @ts-ignore
      const datetime = date.toLocaleString('ru-RU', { timeZone: tz[utc] });


      // const buildPath = (bu: IBusinessUnit, path = "") => {
      //   let parent: IBusinessUnit | undefined;
      //   const sub = bu.name + "/" + path;
      //   // @ts-ignore
      //   if (bu.parentId) parent = businessUnits.find(b => b.id === bu.parentId);
      //   if (parent) buildPath(parent, sub);
      //   else return sub;
      // }

      // const path = bu ? buildPath(bu) : "";


      // const path = bu ? buildPath(bu) : "";

      // try {
      //   // @ts-ignore
      //   datetime = date.toLocaleString('ru-RU', { timeZone: tz[utc] })
      // } catch (e) {
      //   datetime = ""
      // }

      const err = errors.find(err => err.code === row.errorCode);
      const errorType = err !== undefined ? err.type : 'unknown';

      return ({
        id: row.id,
        businessUnit: bu ? bu.name : "",
        model: (vendor ? vendor.name + " " : "") + (model ? model.name : ""),
        path: bu ? bu.address : "",
        serialNumber: cm?.serialNumber ? cm.serialNumber : "",
        errorCode: row.errorCode,
        errorType,
        errorDesc: row.errorText,
        dateObj: date,
        datetime,
        // date: date.toLocaleDateString('ru-RU'),
        // time: date.toLocaleTimeString('ru-RU'),
        duration: row.duration,
      })
    })
    return fmt; 
  }

  const sortData = (
    data: IRowFmt[],
    orderBy: IFiltersOrderBy['orderBy'],
  ): IRowFmt[] => {
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
      else if (column === 'serialNumber') {
        itemA = parseInt(a[column]);
        itemB = parseInt(b[column]);
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
      const err = errors.find(err => err.code === row.errorCode);
      const errorType = err ? err.type : null;
      const errorClass = errorType ? errorClasses[errorType] : 'unknown';
      // const errorClass = errorClasses[row.errorType]
      // const type = errorType[row.errorCode];
      if (errorClass !== 'unknown' && events.includes(errorClass)) return true;
      else return false;
    })
  }
  
  // const filtered = type !== 'all' ? filterData(data) : data;
  const filtered = filterData(data);
  const fmt = formatData(filtered);
  const sorted = sortData(fmt, orderBy);
  const page = sorted.slice((activePage - 1) * perPage, activePage * perPage);
  const fmtArr = page.map((row: IRowFmt) => {
    const { errorType } = row;
    const errorClass = errorType !== 'unknown' 
      ? errorClasses[errorType] 
      : 'unknown';
    return (
      [
        row.businessUnit, 
        // <a onClick={(e) => {
        //   dispatch(visibilitySet(true))
        //   e.preventDefault();
        // }} href='#' >{row.path}</a>,
        row.path,
        row.model,
        <a onClick={(e) => {
          const serialNumber = e.currentTarget.innerHTML;
          const coffeeMachine = coffeeMachines.find(m => m.serialNumber === serialNumber);
          if (coffeeMachine === undefined) {
            return alert("Выбранная кофе-машина не найдена в системе");
          }
          dispatch(coffeeMachineSet(coffeeMachine));
          dispatch(visibilitySet(true));
          e.preventDefault();
        }} href='#' >{row.serialNumber}</a>,
        <span className={`err-badge err-${errorClass}`}>{row.errorCode}</span>,
        row.errorDesc,
        row.datetime,
        row.duration,
      ]
    );
  });

  const tableContent: (string|number|ReactNode)[][] = [
    ["Бизнес-единица", "Ресторан", "Модель машины", "Серийный номер", "Код ошибки", "Описание ошибки", "Дата и время", "Длительность" ],
    ...fmtArr,
  ];

  const tableKeys: string[] = [
    "businessUnit",
    "path",
    "model",
    "serialNumber",
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
    <div className='page page-analytics__data-export__beverages page-shared__table'>
      <div className="page__content container container-fluid">
        <FiltersAside 
          component={{
            regionTree,
            eventsFilter,
          }}
        />
        <div className='filters-top'>
          <FiltersAsideButton />
          <UTC_DDL utc={utc} utcSet={utcSet} />
          <DropDownList 
            onChange={(e) => {
              const value = parseInt(e.currentTarget.value);
              dispatch(activePageSet(1));
              dispatch(rowsPerPageSet(value));
              // dispatch(idleSet({}))
            }} 
            value={perPage.toString()}
            label="Показать по" 
            name='pages' 
            items={[
              { value: "10", innerHTML: "10" },
              { value: "20", innerHTML: "20" },
              { value: "50", innerHTML: "50" },
            ]} 
          />
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
        <div className="filters-bottom">
          {pagination}
        </div>
      </div>
    </div>
  );
}
 
export default Monitoring;
