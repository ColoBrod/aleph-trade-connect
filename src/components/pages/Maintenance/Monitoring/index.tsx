import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from '~/components/ui/Button';
import './style.css';
import DropDownList from '~/components/ui/DropDownList';
import Table from '~/components/blocks/Table';

import imgExcel from './excel.svg'
import FiltersAside from '~/components/blocks/FiltersAside';

import Loader from '~/components/blocks/Loader';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { fetchBeverages, idleSet } from '~/store/pages/analytics/data-export/beverages';
import { rowsPerPageSet, activePageSet } from '~/store/filters/analytics/data-export/beverages';
import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
import RegionTree from '~/components/blocks/RegionTree';

import { 
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
} from '~/store/filters/maintenance';
import Pagination from '~/components/elements/Pagination';

const Monitoring = () => {
  const { type } = useParams();
  const dispatch = useAppDispatch();
  const filtersMonitoring = useAppSelector(state => state.filters.maintenance.monitoring);
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const {
    businessUnits: filtersBusinessUnits
  } = useAppSelector(state => state.filters.maintenance.shared);

  const { activePage, perPage } = filtersMonitoring.pagination;

  // const { status, error, pagesTotal, beverages: rows } = useAppSelector(state => state.pages.maintenance.mon);

  const regionTree = <RegionTree 
    actions={{
      businessUnitsSet,
      businessUnitsExpanded,
      businessUnitsFilterChanged,
    }}
    items={businessUnits}
    selector={filtersBusinessUnits}
  />

  const tableContent: (string|number)[][] = [
    ["Бизнес-единица", "Ресторан", "Модель машины", "Серийный номер", "Код ошибки", "Описание ошибки", "Дата", "Время", "Длительность" ],
  ];

  // tableContent.push()

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
              : <Table data={tableContent} />
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