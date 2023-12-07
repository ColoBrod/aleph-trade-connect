import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { channel } from '~/services/pusher';

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
  businessUnitsSelectedAll
} from '~/store/filters/maintenance';
import Pagination from '~/components/elements/Pagination';

import { IRow, IRowFmt, idleSet } from '~/store/pages/maintenance/monitoring';
import { IFiltersOrderBy } from '~/interfaces/filters';
import { IPusherMap } from '~/interfaces/pusher';
import EventsFilter from '~/components/blocks/EventsFilter';

const Monitoring = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const filtersMonitoring = useAppSelector(state => state.filters.maintenance.monitoring);
  const { status, error, data, utc } = useAppSelector(state => state.pages.maintenance.monitoring)
  // const { orderBy } =
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const {
    businessUnits: filtersBusinessUnits
  } = useAppSelector(state => state.filters.maintenance.shared);

  const { pagination: { activePage, perPage }, orderBy } = filtersMonitoring;
  const pagesTotal = Math.ceil(data.length / perPage);

  // const { status, error, pagesTotal, beverages: rows } = useAppSelector(state => state.pages.maintenance.mon);
  console.log(utc);

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
    }, 3000)
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
  
  const eventsFilter = <EventsFilter />;

  const formatData = (data: IRow[]): IRowFmt[] => {
    const fmt = data.map(row => {
      const match = row.company.match(/.*, (.*)/);
      const path = match === null ? row.company : match[1];
      // const [date, time] = row.start_datetime.split(" ") as [string, string];
      const date = new Date(row.start_datetime);
      const datetime = date.toLocaleString('ru-RU', { timeZone: utc })

      return ({
        id: row.id,
        businessUnit: "",
        model: "",
        path,
        serialNumber: row.device_code,
        errorCode: row.error_code,
        errorDesc: row.error_text,
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
  
  // const curPage =

  const fmt = formatData(data);
  console.log("DATA:", fmt);
  const sorted = sortData(fmt, orderBy)
  const page = sorted.slice((activePage - 1) * perPage, activePage * perPage);
  const fmtArr = page.map((row: IRowFmt) => [
    row.businessUnit, 
    row.path,
    row.model,
    row.serialNumber,
    row.errorCode,
    row.errorDesc,
    row.datetime,
    row.duration,
  ]);

  const tableContent: (string|number)[][] = [
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
          <DropDownList
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
          />
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
              { value: "2", innerHTML: "2" },
              { value: "3", innerHTML: "3" },
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
