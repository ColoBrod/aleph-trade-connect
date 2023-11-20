import React, { useEffect } from 'react';

import './style.css';

import FiltersAside from '~/components/blocks/FiltersAside';

import DispensingsByRestaurant from './DispensingsByRestaurant';
import DispensingsByHour from './DispensingsByHours';
import CleaningsByRestaurant from './CleaningsByRestaurant';
import DispensingsByWeekday from './DispensiingsByWeekday';
import DispensingsByRecipe from './DispensingsByRecipe';
import DispensingsByCupSize from './DispensingsByCupSize';

import { useAppSelector, useAppDispatch } from '~/hooks';
import { statusSetIdle } from '~/store/pages/analytics/dayly-reports';

const DaylyReports = () => {
  const period = 55;

  const dispatch = useAppDispatch();
  const filtersAnalytics = useAppSelector(state => state.filters.analytics.common);
  const filtersDaylyReports = useAppSelector(state => state.filters.analytics.daylyReports);

  useEffect(() => {
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

      </div>
    </div>
  );
}
 
export default DaylyReports;




