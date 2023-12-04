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
import { rowsPerPageSet, activePageSet } from '~/store/filters/maintenance/monitoring';
import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
import RegionTree from '~/components/blocks/RegionTree';
import { fetchEvents, updateTime } from '~/store/pages/maintenance/monitoring';

import { 
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
} from '~/store/filters/maintenance';
import Pagination from '~/components/elements/Pagination';

import { IRow, IRowFmt, idleSet } from '~/store/pages/maintenance/monitoring';
import { IPusherMap } from '~/interfaces/pusher';

const Monitoring = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const filtersMonitoring = useAppSelector(state => state.filters.maintenance.monitoring);
  const { status, error, data, orderBy } = useAppSelector(state => state.pages.maintenance.monitoring)
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const {
    businessUnits: filtersBusinessUnits
  } = useAppSelector(state => state.filters.maintenance.shared);

  const { activePage, perPage } = filtersMonitoring.pagination;

  // const { status, error, pagesTotal, beverages: rows } = useAppSelector(state => state.pages.maintenance.mon);

  useEffect(() => {
    channel.bind('map', (data: IPusherMap) => {
      dispatch(idleSet(null));
      console.log("Sent from pusher:", data);
    });
    return () => { channel.unbind('map'); }
  }, [status])

  useEffect(() => {
    let intervalId: number;
    if (status === 'idle') {
      dispatch(fetchEvents());
      // dispatch(updateTime());
      // @ts-ignore
      intervalId = setInterval(() => dispatch(updateTime()), 10_000)
    }
    return () => clearInterval(intervalId)
  }, [status])

  const regionTree = <RegionTree 
    actions={{
      businessUnitsSet,
      businessUnitsExpanded,
      businessUnitsFilterChanged,
    }}
    items={businessUnits}
    selector={filtersBusinessUnits}
  />

  // console.log("Data:", );

  const formatData = (data: IRow[]): IRowFmt[] => {
    const fmt = data.map(row => {
      const match = row.company.match(/.*, (.*)/);
      const path = match === null ? row.company : match[1];
      // const [date, time] = row.start_datetime.split(" ") as [string, string];
      const date = new Date(row.start_datetime);
      return ({
        id: row.id,
        businessUnit: "",
        model: "",
        path,
        serialNumber: row.device_code,
        errorCode: row.error_code,
        errorDesc: row.error_text,
        date: date.toLocaleDateString('ru-RU'),
        time: date.toLocaleTimeString('ru-RU'),
        duration: "",
      })
    })
    return fmt;
  }

  const sortData = (
    data: IRowFmt[],
    orderBy: keyof IRowFmt,
    desc: boolean
  ): IRowFmt[] =>
    data.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return desc ? -1 : 1;
      else if (a[orderBy] > b[orderBy]) return desc ? 1 : -1;
      return 0;
    });

  const fmt = formatData(data);
  // sortData(fmt, )
  const fmtArr = fmt.map((row: IRowFmt) => [
    row.businessUnit, 
    row.path,
    row.model,
    row.serialNumber,
    row.errorCode,
    row.errorDesc,
    row.date,
    row.time,
    row.duration,
  ]);

  const tableContent: (string|number)[][] = [
    ["Бизнес-единица", "Ресторан", "Модель машины", "Серийный номер", "Код ошибки", "Описание ошибки", "Дата", "Время", "Длительность" ],
    ...fmtArr,
  ];

  const tableKeys: string[] = [
    "businessUnit",
    "path",
    "model",
    "serialNumber",
    "errorCode",
    "errorDesc",
    "date",
    "time",
    "duration",
  ];

  const pagination = <Pagination
    handler={
      (pageIndex: number) => 1
    }
    pagesTotal={10}
    activePage={1}
    />

  return (
    <div className='page page-analytics__data-export__beverages page-shared__table'>
      <div className="page__content container container-fluid">
        <FiltersAside 
          component={{
            regionTree,
          }}
        />
        <div className='filters-top'>
          <Button onClick={() => console.log("empty")} layout='light'>
            Обновить
          </Button>
          <DropDownList
            onChange={(e) => {
              console.log(e.currentTarget.value)
            }}
            value={'3'}
            label='UTC+'
            name='utc'
            items={[
              { value: '0', innerHTML: "+00:00" },
              { value: '1', innerHTML: "+01:00" },
              { value: '2', innerHTML: "+02:00" },
              { value: '3', innerHTML: "+03:00" },
              { value: '4', innerHTML: "+04:00" },
              { value: '5', innerHTML: "+05:00" },
              { value: '6', innerHTML: "+06:00" },
              { value: '7', innerHTML: "+07:00" },
              { value: '8', innerHTML: "+08:00" },
              { value: '9', innerHTML: "+09:00" },
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
              : <Table data={tableContent} keys={tableKeys} />
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
