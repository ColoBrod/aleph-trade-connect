import React, { ReactNode, useEffect } from 'react';

import './style.css';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { use_LG_MAX } from '~/media-queries';
import { visibilitySet } from '~/store/ui/filters-aside';

import imgFilter from './filters.svg';

interface Props {
  component: {
    datePicker?: ReactNode;
    timePicker?: ReactNode;
    regionTree?: ReactNode;
    coffeeMachineFilter?: ReactNode;
    serialNumbersFilter?: ReactNode;
  },
}

const FiltersAside = (props: Props) => {
  const { visible } = useAppSelector(state => state.ui.filtersAside)
  const dispatch = useAppDispatch();
  const { component } = props;
  const lgMax = use_LG_MAX();

  useEffect(() => {
    if (lgMax) dispatch(visibilitySet(false));
    else dispatch(visibilitySet(true));
  }, [lgMax])

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

  const renderCloseBtn = (): ReactNode => {
    return (
      <img 
        className='filters-aside__toggle-btn'
        src={imgFilter} 
        alt="Показать/Скрыть фильтры" 
        onClick={() => dispatch(visibilitySet(undefined))}
        />
      // <div style={{color: 'red', fontSize: '20px'}}>LG and less</div>
    )
  }

  const renderDateTimeSection = (): ReactNode => (
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
  );

  const renderRestaurantsSection = (): ReactNode => (
    <div className="filters-section filters-section-restaurants">
      <div className="filters-section__header">
        <div className="filters-section__title">Рестораны</div>
      </div>
      <div className="filters-section__component">
        {component.regionTree}
      </div>
    </div>
  );

  const renderCoffeeMachines = (): ReactNode => (
    <div className="filters-section">
      <div className="filters-section__header">
        <div className="filters-section__title">Модель кофемашины</div>
      </div>
      <div className="filters-section__component">
        {component.coffeeMachineFilter}
      </div>
    </div>
  );

  const renderSerialNumbers = (): ReactNode => (
    <div className="filters-section">
      <div className="filters-section__header">
        <div className="filters-section__title">Серийный номер</div>
      </div>
      <div className="filters-section__component">
        {component.serialNumbersFilter}
        {/* <SerialNumbersFilter handleAdd={serialNumberAdded} handleRemove={serialNumberRemoved} items={filtersSerialNumbers} /> */}
      </div>
    </div>
  )

  return (
    <>
      {lgMax ? renderCloseBtn() : null}
      <div
        className={`filters filters-aside ${visible ? "visible" : "hidden"}`}
      >
        <div className="filters-aside__inner">
          {component.datePicker && component.timePicker
            ? renderDateTimeSection()
            : null}
          {component.regionTree ? renderRestaurantsSection() : null}
          {component.coffeeMachineFilter ? renderCoffeeMachines() : null}
          {component.serialNumbersFilter ? renderSerialNumbers() : null}
        </div>
      </div>
    </>
  );
}
 
export default FiltersAside;