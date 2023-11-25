import React, { ReactNode } from 'react';

import './style.css';
import DatePicker from '~/components/elements/DatePicker';
import TimePicker from '~/components/elements/TimePicker';
import RegionTree from '../RegionTree';
import SearchInput from '~/components/ui/SearchInput';
import CoffeeMachineFilter from '../CoffeeMachineFilter';
import { serialNumberAdded } from '~/store/filters/analytics/dayly-reports';
import SNBadge from '~/components/elements/SNBadge';

import { useAppDispatch, useAppSelector } from '~/hooks';
import { businessUnitsSet } from '~/store/filters/analytics';
import { coffeeMachineModelSelected } from '~/store/filters/analytics';

interface Props {
  component: {
    DatePicker: ReactNode;
    TimePicker: ReactNode;
    RegionTree: ReactNode;
    CoffeeMachineFilter: ReactNode;
    SerialNumbers: ReactNode;
  },
}

const FiltersAside = () => {
  const dispatch = useAppDispatch();
  const { serialNumbers } = useAppSelector(state => state.filters.analytics.daylyReports);
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const checked = businessUnits.map(unit => {
    if (unit.type === 0) return unit.id.toString();
  })
  const filtersCoffeeMachineModels = useAppSelector(
    state => state.filters.analytics.common.coffeeMachineModels.list
  )

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
          <DatePicker />
          <TimePicker />
        </div>
      </div>
      <div className="filters-section filters-section-restaurants">
        <div className="filters-section__header">
          <div className="filters-section__title">Рестораны</div>
        </div>
        <div className="filters-section__component">
          <RegionTree 
            onCheck={(checked) => {
              dispatch(businessUnitsSet(checked))
            }} 
            items={businessUnits} 
            />
        </div>
      </div>
      <div className="filters-section">
        <div className="filters-section__header">
          <div className="filters-section__title">Модель кофемашины</div>
        </div>
        <div className="filters-section__component">
          {/* <SearchInput onChange={(e) => console.log(e.target.value)} /> */}
          <CoffeeMachineFilter checked={filtersCoffeeMachineModels} reducer={coffeeMachineModelSelected} />
        </div>
      </div>
      <div className="filters-section">
        <div className="filters-section__header">
          <div className="filters-section__title">Серийный номер</div>
        </div>
        <div className="filters-section__component">
          <SearchInput
            onEnter={(value) =>
              dispatch(
                serialNumberAdded({
                  substring: value,
                })
              )
            }
          />
          <div className="sn-badges">
            {serialNumbers.list.map((sn) => (
              <SNBadge key={sn}>{sn}</SNBadge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default FiltersAside;