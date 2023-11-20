import React, { useEffect } from 'react';

import Button from '~/components/ui/Button';
import './style.css';
import DropDownList from '~/components/ui/DropDownList';

import imgExcel from './excel.svg'
import FiltersAside from '~/components/blocks/FiltersAside';

import Pagination from '~/components/elements/Pagination';

import { useAppDispatch, useAppSelector } from '~/hooks';
// import { rowsSet } from '~/store/pages/analytics/trends/data-export/beverages';
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

  // if (status === 'loading') {}


  return (
    <div className='page page-analytics__data-export__beverages'>
      <div className="page__content container container-left">
        <FiltersAside />
        <div className='filters-top'>
          <Button layout='light'>Обновить</Button>
          <Button layout='light'>
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
          <DropDownList label="UTC" name='utc' items={[
            { value: "2", innerHTML: "+ 02:00" },
            { value: "3", innerHTML: "+ 03:00" },
            { value: "4", innerHTML: "+ 04:00" },
            { value: "5", innerHTML: "+ 05:00" },
            { value: "6", innerHTML: "+ 06:00" },
            { value: "7", innerHTML: "+ 07:00" },
            { value: "8", innerHTML: "+ 08:00" },
            { value: "9", innerHTML: "+ 09:00" },
            { value: "10", innerHTML: "+ 10:00" },
          ]} />
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
          <table>
            <thead>
              <tr>
                <th>Округ</th>
                <th>Ресторан</th>
                <th>Модель машины</th>
                <th>Номер машины</th>
                <th>Дата</th>
                <th>Время</th>
                <th>UTC</th>
                <th>Рецепт</th>
                <th>Размер чашки</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map((row, i) => <tr key={i}>
                  <td>{row.federalDistrict}/{row.city}</td>
                  <td>{row.address}</td>
                  <td>{row.machineModel}</td>
                  <td>{row.serialNumber}</td>
                  <td>{row.date}</td>
                  <td></td>
                  <td>+3:00</td>
                  <td>{row.beverage}</td>
                  <td>M</td>
                  <td>{row.total}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
export default Beverages;