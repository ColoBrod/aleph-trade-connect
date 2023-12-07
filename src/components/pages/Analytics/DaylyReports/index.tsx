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
import { initialState as initialFiltersDaylyReports, serialNumberAdded, serialNumberRemoved } from '~/store/filters/analytics/dayly-reports';
import { dateRangeSet, timeRangeSet } from '~/store/filters/analytics/dayly-reports';
import { 
  coffeeMachineModelSelected,
  businessUnitsSet,
  businessUnitsExpanded,
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
} from '~/store/filters/analytics';
import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
import RegionTree from '~/components/blocks/RegionTree';
import CoffeeMachineFilter from '~/components/blocks/CoffeeMachineFilter';
import SerialNumbersFilter from '~/components/blocks/SerialNumbersFilter';

const DaylyReports = () => {
  const period = 55;

  const dispatch = useAppDispatch();
  const filtersAnalytics = useAppSelector(state => state.filters.analytics.common);
  const filtersDaylyReports = useAppSelector(state => state.filters.analytics.daylyReports);
  
  const { date, time } = useAppSelector(state => state.filters.analytics.daylyReports.dateRange);
  const { 
    list: filtersSerialNumbers 
  } = useAppSelector(state => state.filters.analytics.daylyReports.serialNumbers);
  const { 
    list: filtersCoffeeMachineModels,
  } = useAppSelector(state => state.filters.analytics.common.coffeeMachineModels);
  const {
    businessUnits: filtersBusinessUnits
  } = useAppSelector(state => state.filters.analytics.common);

  const { businessUnits } = useAppSelector(state => state.entities.data);

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

  const datePicker = <DatePicker dateRangeSet={dateRangeSet} date={{...date}} />
  const timePicker = <TimePicker timeRangeSet={timeRangeSet} time={{...time}} />

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
    <div className='page page-analytics__dayly-reports'>
      <div className="page__content container">
        <FiltersAside 
          component={{
            datePicker,
            timePicker,
            regionTree,
            coffeeMachineFilter,
            serialNumbersFilter,
          }}
        />
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




