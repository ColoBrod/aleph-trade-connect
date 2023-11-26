import React, { useEffect } from 'react';

import Button from '~/components/ui/Button';
import './style.css';
import DropDownList from '~/components/ui/DropDownList';
import Table from '~/components/blocks/Table';

import imgExcel from './excel.svg'
import FiltersAside from '~/components/blocks/FiltersAside';

import Pagination from '~/components/elements/Pagination';
import Loader from '~/components/blocks/Loader';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchCleanings, idleSet } from '~/store/pages/analytics/data-export/cleanings';
import { rowsPerPageSet, activePageSet } from '~/store/filters/analytics/data-export/cleanings';
import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
import RegionTree from '~/components/blocks/RegionTree';
import CoffeeMachineFilter from '~/components/blocks/CoffeeMachineFilter';
import SerialNumbersFilter from '~/components/blocks/SerialNumbersFilter';
import { 
  serialNumberAdded, 
  serialNumberRemoved 
} from '~/store/filters/analytics/data-export';
import { 
  dateRangeSet, 
  timeRangeSet, 
} from '~/store/filters/analytics/data-export';
import { 
  coffeeMachineModelSelected ,
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
} from '~/store/filters/analytics';
import Calendar from '~/components/ui/Calendar';


const Cleanings = () => {
  const dispatch = useAppDispatch();
  const filtersAnalytics = useAppSelector(state => state.filters.analytics.common);
  const filtersAnalyticsDataExport = useAppSelector(state => state.filters.analytics.dataExport.shared);

  const { date, time } = useAppSelector(state => state.filters.analytics.dataExport.shared.dateRange);
  const { 
    list: filtersSerialNumbers 
  } = useAppSelector(state => state.filters.analytics.dataExport.shared.serialNumbers);
  const { 
    list: filtersCoffeeMachineModels,
  } = useAppSelector(state => state.filters.analytics.common.coffeeMachineModels);
  const {
    businessUnits: filtersBusinessUnits
  } = useAppSelector(state => state.filters.analytics.common);

  const { businessUnits } = useAppSelector(state => state.entities.data);
  const filtersCleanings = useAppSelector(state => state.filters.analytics.dataExport.cleanings);
  const { status, error, pagesTotal, cleanings: rows } = useAppSelector(state => state.pages.analytics.dataExport.cleanings);
  const { activePage, perPage } = filtersCleanings.pagination;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCleanings());
  }, [status, activePage, perPage]);

  const tableContent: (string|number)[][] = [
    ["Бизнес-единица", "Ресторан", "Модель машины", "Серийный номер", "Дата", "Время", "UTC+", "Тип чистки", "Плановое количество", "Фактическое количество"]
  ];

  const tableRows = rows.map(row => [
    row.federalDistrict + "/" + row.city,
    row.restaurant,
    row.machineModel,
    row.serialNumber,
    row.date,
    row.time,
    row.utc,
    row.type,
    row.planned,
    row.total,
  ]);
  tableContent.push(...tableRows);

  const datePicker = <DatePicker dateRangeSet={dateRangeSet} date={{...date}} />
  const timePicker = <TimePicker timeRangeSet={timeRangeSet} time={{...time}} />

  const regionTree = <RegionTree 
    actions={{
      businessUnitsSet,
      businessUnitsExpanded,
      businessUnitsFilterChanged,
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
    <div className='page page-analytics__data-export__cleanings'>
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
          <Button onClick={() => console.log("empty")}  layout='light'>Обновить</Button>
          <Button onClick={() => console.log("empty")}  layout='light'>
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
          {/* <DropDownList label="UTC" name='utc' items={[
            { value: "2", innerHTML: "+ 02:00" },
            { value: "3", innerHTML: "+ 03:00" },
            { value: "4", innerHTML: "+ 04:00" },
            { value: "5", innerHTML: "+ 05:00" },
            { value: "6", innerHTML: "+ 06:00" },
            { value: "7", innerHTML: "+ 07:00" },
            { value: "8", innerHTML: "+ 08:00" },
            { value: "9", innerHTML: "+ 09:00" },
            { value: "10", innerHTML: "+ 10:00" },
          ]} /> */}
          <Pagination 
            handler={
              (pageIndex: number) => {
                dispatch(activePageSet(pageIndex));
                dispatch(idleSet({}))
              }
            } 
            pagesTotal={pagesTotal} 
            activePage={activePage} />
        </div>
        <div className="table-wrapper">
          {
            status === 'loading'
              ? <Loader />
              : <Table data={tableContent} />
          }
        </div>
      </div>
    </div>
  );
}
 
export default Cleanings;