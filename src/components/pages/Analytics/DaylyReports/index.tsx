import React, { useEffect } from 'react';

import './style.css';

import FiltersAside from '~/components/blocks/FiltersAside';
import Calendar from '~/components/ui/Calendar';

import DispensingsByRestaurant from './DispensingsByRestaurant';
import DispensingsByHour from './DispensingsByHours';
import CleaningsByRestaurant from './CleaningsByRestaurant';
import DispensingsByWeekday from './DispensiingsByWeekday';
import DispensingsByRecipe from './DispensingsByRecipe';
import DispensingsByCupSize from './DispensingsByCupSize';

import { useAppSelector, useAppDispatch } from '~/hooks';
import { statusSetIdle } from '~/store/pages/analytics/dayly-reports';
import { initialState as initialFiltersAnalytics } from '~/store/filters/analytics';
import { initialState as initialFiltersDaylyReports } from '~/store/filters/analytics/dayly-reports';
import { dateRangeSet } from '~/store/filters/analytics/dayly-reports';

const DaylyReports = () => {
  const period = 55;

  const dispatch = useAppDispatch();
  const filtersAnalytics = useAppSelector(state => state.filters.analytics.common);
  const filtersDaylyReports = useAppSelector(state => state.filters.analytics.daylyReports);
  
  /**
   * Перезагружаем графики на странице каждый раз, когда пользователь меняет
   * фильтры на странице.
   */
  useEffect(() => {
    if (
      initialFiltersAnalytics !== filtersAnalytics ||
      initialFiltersDaylyReports !== filtersDaylyReports
    )
      dispatch(statusSetIdle({}));
  }, [filtersAnalytics, filtersDaylyReports])

  return (
    <div className='page page-analytics__dayly-reports'>
      <div className="page__content container">
        <FiltersAside />
        {/* Напитки по ресторанам */}
        <DispensingsByRestaurant />
        {/* Соблюдение правил чистки ресторанами */}
        {/* TODO: Динамически расчитывать высоту графика */}
        <CleaningsByRestaurant />
        {/* Напитки по часам */}
        <DispensingsByHour />
        {/* Напитки по дням */}
        <DispensingsByWeekday />
        {/* Напитки по рецепту */}
        <DispensingsByRecipe />
        {/* Напитки по размеру чашки */}
        <DispensingsByCupSize />

        {/* UI Calendar. Появляется при нажатиии на DatePicker */}
        <Calendar type='62-days' actionCreator={dateRangeSet} />

        {/* (id: string, date: Date) => {
          const dd = date.getDate();
          const mm = date.getMonth() + 1;
          const yyyy = date.getFullYear();
          const payload = id === 'date-start'
            ? { start: `${mm}/${dd}/${yyyy}` }
            : { end: `${mm}/${dd}/${yyyy}` };
          dispatch(dateRangeSet(payload));
          dispatch(displaySet({ visible: false }));
        } */}
      </div>
    </div>
  );
}
 
export default DaylyReports;




