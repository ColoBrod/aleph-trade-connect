import React, { ReactNode } from 'react';

import './style.css';
import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
import RegionTree from '../RegionTree';
import SearchInput from '~/components/ui/SearchInput';
import CoffeeMachineFilter from '../CoffeeMachineFilter';
import SerialNumbersFilter from '../SerialNumbersFilter';
import { serialNumberAdded, serialNumberRemoved } from '~/store/filters/analytics/dayly-reports';
import SNBadge from '~/components/elements/SNBadge';

import { useAppDispatch, useAppSelector } from '~/hooks';
// import { businessUnitsSet } from '~/store/filters/analytics';
// import { coffeeMachineModelSelected } from '~/store/filters/analytics';

interface Props {
  component: {
    datePicker: ReactNode;
    timePicker: ReactNode;
    regionTree: ReactNode;
    coffeeMachineFilter: ReactNode;
    serialNumbersFilter: ReactNode;
  },
}

const FiltersAside = (props: Props) => {
  const dispatch = useAppDispatch();
  const { component } = props;
  // const { serialNumbers } = useAppSelector(state => state.filters.analytics.daylyReports);
  // const { businessUnits } = useAppSelector(state => state.entities.data);
  // const checked = businessUnits.map(unit => {
  //   if (unit.type === 0) return unit.id.toString();
  // });
  // const filtersCoffeeMachineModels = useAppSelector(
  //   state => state.filters.analytics.common.coffeeMachineModels.list
  // );
  // const filtersSerialNumbers = useAppSelector(
  //   state => state.filters.analytics.daylyReports.serialNumbers.list
  // );

  return (
    <div className="filters filters-aside">
      <div className="filters-section">
        <div className="filters-section__header">
          <div className="filters-section__title">Диапазон по времени</div>
          <div className="filters-section__subtitle">
            (Максимум 62 дня назад)
          </div>
        </div>
        <div className="filters-section__component">
          {component.datePicker}
          {component.timePicker}
        </div>
      </div>
      <div className="filters-section filters-section-restaurants">
        <div className="filters-section__header">
          <div className="filters-section__title">Рестораны</div>
        </div>
        <div className="filters-section__component">
          {component.regionTree}
        </div>
      </div>
      <div className="filters-section">
        <div className="filters-section__header">
          <div className="filters-section__title">Модель кофемашины</div>
        </div>
        <div className="filters-section__component">
          {component.coffeeMachineFilter}
        </div>
      </div>
      <div className="filters-section">
        <div className="filters-section__header">
          <div className="filters-section__title">Серийный номер</div>
        </div>
        <div className="filters-section__component">
          {component.serialNumbersFilter}
          {/* <SerialNumbersFilter handleAdd={serialNumberAdded} handleRemove={serialNumberRemoved} items={filtersSerialNumbers} /> */}
        </div>
      </div>
    </div>
  );
}
 
export default FiltersAside;