import React, { useEffect } from 'react';

import Button from "~/components/ui/Button";
import DropDownList from '~/components/ui/DropDownList';
import Table from '~/components/blocks/Table';

import imgExcel from './excel.svg'
import FiltersAside from '~/components/blocks/FiltersAside';
import Pagination from '~/components/elements/Pagination';
import Loader from '~/components/blocks/Loader';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchTime, idleSet } from '~/store/pages/maintenance/data-export/time';
import { rowsPerPageSet, activePageSet, orderBySet } from '~/store/filters/maintenance/data-export/time';

import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
import RegionTree from '~/components/blocks/RegionTree';
import CoffeeMachineFilter from '~/components/blocks/CoffeeMachineFilter';
import SerialNumbersFilter from '~/components/blocks/SerialNumbersFilter';

import { serialNumberAdded, serialNumberRemoved, dateRangeSet, timeRangeSet } from '~/store/filters/maintenance/data-export';
import { 
  coffeeMachineModelSelected,
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
} from '~/store/filters/maintenance';
import Calendar from '~/components/ui/Calendar';

const Time = () => {
  const dispatch = useAppDispatch();
  const { date, time } = useAppSelector(state => state.filters.maintenance.dataExport.shared.dateRange);
  const { 
    list: filtersSerialNumbers 
  } = useAppSelector(state => state.filters.maintenance.dataExport.shared.serialNumbers);

  const {
    list: filtersCoffeeMachineModels
  } = useAppSelector(state => state.filters.maintenance.shared.coffeeMachineModels);

  const {
    businessUnits: filtersBusinessUnits
  } = useAppSelector(state => state.filters.maintenance.shared);

  const { businessUnits } = useAppSelector(state => state.entities.data);
  const filtersTime = useAppSelector(state => state.filters.maintenance.dataExport.time);
  const { status, error, pagesTotal, time: rows } = useAppSelector(
    state => state.pages.maintenance.dataExport.time
  );
  const { activePage, perPage } = filtersTime.pagination;
  const { orderBy } = filtersTime;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTime());
  }, [status, activePage, perPage])

  const pagination = <Pagination
    handler={
      (pageIndex: number) => {
        dispatch(activePageSet(pageIndex));
        dispatch(idleSet(null));
      }
    }
    pagesTotal={pagesTotal}
    activePage={activePage}
    />

  const tableContent: (string | number)[][] = [
    [
      "Бизнес-единица",
      "Ресторан",
      "Модель машины",
      "Серийный номер",
      "Дата и время",
      "UTC+",
      "Время работы с",
      "Простой по поломке с",
      "Простой по обслуживанию с",
      "Время",
    ],
  ];
  const tableKeys: string[] = [
    "businessUnit",
    "restaurant",
    "machineModel",
    "serialNumber",
    "datetime",
    "utc",
    "uptimeFrom",
    "downtimeByBreakdown",
    "downtimeByService",
    "timeTotal",
  ];

  const tableRows = rows.map(row => [
    row.federalDistrict + "/" + row.city,
    row.restaurant,
    row.machineModel,
    row.serialNumber,
    row.date + " " + row.time,
    row.utc,
    row.uptimeFrom,
    row.downtimeByBreakdown,
    row.downtimeByService,
    row.timeTotal,
  ]);

  tableContent.push(...tableRows);

  const datePicker = <DatePicker dateRangeSet={dateRangeSet} date={{...date}} />
  const timePicker = <TimePicker timeRangeSet={timeRangeSet} time={{...time}} />

  const regionTree = <RegionTree 
    actions={{
      businessUnitsSet,
      businessUnitsExpanded,
      businessUnitsFilterChanged,
      businessUnitsSelectedAll
    }}
    items={businessUnits}
    selector={filtersBusinessUnits}
  />

  const coffeeMachineFilter = <CoffeeMachineFilter 
    checked={filtersCoffeeMachineModels} 
    reducer={coffeeMachineModelSelected} 
  />

  const serialNumbersFilter = <SerialNumbersFilter 
    handleAdd={serialNumberAdded} 
    handleRemove={serialNumberRemoved} 
    items={filtersSerialNumbers} 
  />

  return (
    <div className='page page-analytics__data-export__beverages page-shared__table'>
      <div className="page__content container container-fluid">
        <FiltersAside 
          component={{
            datePicker,
            timePicker,
            coffeeMachineFilter,
            regionTree,
            serialNumbersFilter,
          }}
        />
        <div className='filters-top'>
          <Button onClick={() => dispatch(idleSet(null))} layout='light'>
            Обновить
          </Button>
          <Button onClick={() => 1} layout='light'>
            <>
              <img src={imgExcel} alt="Excel icon" />
              Скачать
            </>
          </Button>
          <DropDownList 
            onChange={(e) => {
              const value = parseInt(e.currentTarget.value);
              dispatch(activePageSet(1));
              dispatch(rowsPerPageSet(value));
              dispatch(idleSet({}))
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
                  orderBy={orderBy} 
                  handleSort={(key: string): void => {
                    dispatch(orderBySet(key));
                    dispatch(idleSet(null));
                  }} />
          }
        </div>
        <div className="filters-bottom">
          {pagination}
        </div>
        <Calendar type='62-days' actionCreator={dateRangeSet} />
      </div>
    </div>
  );
}
 
export default Time;
