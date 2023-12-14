import React, { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { channel } from '~/services/pusher';
import { Link } from 'react-router-dom';
import { visibilitySet } from '~/store/ui/modal-box';

// ?modal-box=coffee-machine

import Button from '~/components/ui/Button';
import './style.css';
import DropDownList from '~/components/ui/DropDownList';
import Table from '~/components/blocks/Table';

import imgExcel from './excel.svg'
import FiltersAside from '~/components/blocks/FiltersAside';

import Loader from '~/components/blocks/Loader';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { rowsPerPageSet, activePageSet, orderBySet } from '~/store/filters/maintenance/monitoring';
import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
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

import { ErrorType, error as errorType, eventTypes } from '~/services/errors';
import FiltersAsideButton from '~/components/elements/FiltersAsideButton';
import UTC_DDL from '~/components/elements/UTC_DDL';

const Monitoring = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filtersMonitoring = useAppSelector(state => state.filters.maintenance.monitoring);
  const { status, error, data, utc } = useAppSelector(state => state.pages.maintenance.monitoring)
  // const { orderBy } =
  const { businessUnits } = useAppSelector(state => state.entities.data);
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
      // dispatch(updateTime());
    }
  }, [status])
  
  useEffect(() => {
    let intervalId: any;
    intervalId = setInterval(() => {
      dispatch(updateTime())
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

      let datetime: string;

      try {
        datetime = date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
      } catch (e) {
        console.log("TIMEZONE:", e);
        datetime = ""
      }
      console.log("DATE:", date);
      console.log("DATETIME:", datetime);

      return ({
        id: row.id,
        businessUnit: "",
        model: "",
        path: "",
        serialNumber: row.coffeeMachineId,
        errorCode: row.errorCode,
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
        // console.log("Dates", itemA, itemB);
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
      const type = errorType[row.errorCode];
      if (events.includes(type)) return true;
      else return false;
    })
  }
  
  // const curPage =

  const filtered = type !== 'all' ? filterData(data) : data;
  const fmt = formatData(filtered);
  const sorted = sortData(fmt, orderBy);
  const page = sorted.slice((activePage - 1) * perPage, activePage * perPage);
  const fmtArr = page.map((row: IRowFmt) => [
    row.businessUnit, 
    <a onClick={(e) => {
      dispatch(visibilitySet(true))
      e.preventDefault();
    }} href='#' >{row.path}</a>,
    // row.path,
    row.model,
    row.serialNumber,
    row.errorCode,
    row.errorDesc,
    row.datetime,
    row.duration,
  ]);

  console.log("Table:", fmtArr);

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
          {/* <Button onClick={() => console.log("empty")} layout='light'>
            Обновить
          </Button> */}
          <FiltersAsideButton />
          <UTC_DDL utc={utc} utcSet={utcSet} />
          {/* <DropDownList
            onChange={(e) => {
              // const utc = parseInt(e.currentTarget.value);
              dispatch(utcSet(e.currentTarget.value));
            }}
            value={utc}
            label='UTC+'
            name='utc'
            items={[
              { value: '+00:00', innerHTML: "+00:00" },
              { value: '+01:00', innerHTML: "+01:00" },
              { value: '+02:00', innerHTML: "+02:00" },
              { value: '+03:00', innerHTML: "+03:00" },
              { value: '+04:00', innerHTML: "+04:00" },
              { value: '+05:00', innerHTML: "+05:00" },
              { value: '+06:00', innerHTML: "+06:00" },
              { value: '+07:00', innerHTML: "+07:00" },
              { value: '+08:00', innerHTML: "+08:00" },
              { value: '+09:00', innerHTML: "+09:00" },
            ]}
          /> */}
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
