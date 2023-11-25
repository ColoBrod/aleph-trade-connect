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
import { fetchBeverages, idleSet } from '~/store/pages/analytics/data-export/beverages';
import { rowsPerPageSet, activePageSet } from '~/store/filters/analytics/data-export/beverages';

const Beverages = () => {

  const dispatch = useAppDispatch();
  const filtersBeverages = useAppSelector(state => state.filters.analytics.dataExport.beverages);
  const { status, error, pagesTotal, beverages: rows } = useAppSelector(state => state.pages.analytics.dataExport.beverages);
  const { activePage, perPage } = filtersBeverages.pagination;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchBeverages());
  }, [status, activePage, perPage]);

  const pagination = <Pagination 
    handler={
      (pageIndex: number) => {
        dispatch(activePageSet(pageIndex));
        dispatch(idleSet({}))
      }
    } 
    pagesTotal={pagesTotal} 
    activePage={activePage} 
    />

  const tableContent: (string|number)[][] = [
    ["Бизнес-единица", "Ресторан", "Модель машины", "Номер машины", "Дата", "Время", "UTC+", "Рецепт", "Размер чашки", "Количество"]
  ];

  const tableRows = rows.map(row => [
    row.federalDistrict + "/" + row.city,
    row.restaurant,
    row.machineModel,
    row.serialNumber,
    row.date,
    row.time,
    row.utc,
    row.recipe,
    row.cupSize,
    row.total,
  ]);
  tableContent.push(...tableRows);

  return (
    <div className='page page-analytics__data-export__beverages'>
      <div className="page__content container container-fluid">
        <FiltersAside />
        <div className='filters-top'>
          <Button onClick={() => console.log("empty")} layout='light'>Обновить</Button>
          <Button onClick={() => console.log("empty")} layout='light'>
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
 
export default Beverages;