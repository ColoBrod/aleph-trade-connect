import React from 'react';

import Button from '~/components/ui/Button';
import './style.css';
import DropDownList from '~/components/ui/DropDownList';

import imgExcel from './excel.svg'
import FiltersAside from '~/components/blocks/FiltersAside';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { rowsSet } from '~/store/pages/analytics/trends/data-export/beverages';

const Beverages = () => {

  const dispatch = useAppDispatch();
  const { rows: rowsNumber } = useAppSelector(state => state.pages.analytics.trends.dataExport.beverages);
  const rows = Array(rowsNumber).fill(1);

  return (
    <div className='page page-analytics__data-export__beverages'>
      <div className="page__content container container-left">
        <FiltersAside />
        <div className='filters-top'>
          <Button>Обновить</Button>
          <Button>
            <>
              <img src={imgExcel} alt="Excel icon" />
              Скачать
            </>
          </Button>
          <DropDownList 
            onChange={(e) => {
              const value = parseInt(e.currentTarget.value);
              dispatch(rowsSet({ rows: value }));
            }} 
            value={rowsNumber.toFixed(0)}
            label="Показать по" 
            name='pages' 
            items={[
              { value: "10", innerHTML: "10" },
              { value: "20", innerHTML: "20" },
              { value: "30", innerHTML: "30" },
            ]} 
          />
          <DropDownList label="UTC" name='utc' items={[
            { value: "0", innerHTML: "+ 00:00" },
            { value: "1", innerHTML: "+ 01:00" },
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
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Округ</th>
                <th>Город</th>
                <th>Ресторан</th>
                <th>Модель машины</th>
                <th>Номер машины</th>
                <th>Дата</th>
                <th>Рецепт</th>
                <th>Размер чашки</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              {
                rows.map(el => <tr>
                  <td>Центральный</td>
                  <td>Москва</td>
                  <td>Бургер-3780</td>
                  <td>WMF 1500S+</td>
                  <td>13918</td>
                  <td>29.08.2023</td>
                  <td>Капучино 400мл</td>
                  <td>M</td>
                  <td>65</td>
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