import React, { useEffect } from 'react';

import './style.css';
import InfoBlock from '~/components/blocks/InfoBlock';
import RegionTree from '~/components/blocks/RegionTree'; 
import DateRange from '~/components/elements/DateRange';
import CoffeeMachineFilter from '~/components/blocks/CoffeeMachineFilter';
// import RecipesFilter from '~/components/blocks/RecipesFilter';
import ErrorsFilter from '~/components/blocks/ErrorsFilter';

import { useAppSelector, useAppDispatch } from '~/hooks';
import { 
  businessUnitsSet, 
  businessUnitsExpanded, 
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
} from '~/store/filters/maintenance';
import { dateRangeSet } from '~/store/filters/maintenance/working-hours';
import { coffeeMachineModelSelected } from '~/store/filters/maintenance';
import { errorToggled, errorsSelected, errorsUnselected } from '~/store/filters/maintenance';

const Settings = () => {
  const { errors, businessUnits, coffeeMachineModels } = useAppSelector(
    state => state.entities.data
  );
  const { businessUnits: businessUnitsFilters } = useAppSelector(
    state => state.filters.maintenance.shared
  );
  const { dateRange } = useAppSelector(state => state.filters.maintenance.workingHours);
  const businessUnitsActions = {
    businessUnitsSet,
    businessUnitsExpanded,
    businessUnitsFilterChanged,
    businessUnitsSelectedAll,
  };
  const { errors: errorsFilters } = useAppSelector(
    state => state.filters.maintenance.shared
  );
  // const checked = businessUnits.map(unit => {
  //   if (unit.type === 0) return unit.id.toString();
  // });

  const dispatch = useAppDispatch()
  const filtersCoffeeMachineModels = useAppSelector(
    state => state.filters.maintenance.shared.coffeeMachineModels.list
  );

  return (
    <div className="page page-analytics__maintenance__settings  page-shared__settings">
      <div className="page__content container">
        
        {/* <InfoBlock layout='info' header='Обратите внимание: данные доступны только за последние 62 дня'>
        </InfoBlock> */}

        <InfoBlock layout='single-item' header='Структура ресторанов'>
          <RegionTree 
            items={businessUnits}
            selector={businessUnitsFilters}
            actions={businessUnitsActions}
            // items={businessUnits} 
            // onCheck={(checked) => {
            //   dispatch(businessUnitsSet(checked.map(id => parseInt(id))))
            // }}  
          />
        </InfoBlock>

        <InfoBlock layout='single-item' header='Период данных'>
          <DateRange dateRange={dateRange} dateRangeSet={dateRangeSet} />
          <div className="data-available-for-the-last-62-days">Обратите внимание: данные доступны только за последние 62 дня</div>
        </InfoBlock>

        <InfoBlock layout='single-item' header='Модель кофе-машины'>
          <CoffeeMachineFilter 
            checked={filtersCoffeeMachineModels} 
            reducer={coffeeMachineModelSelected}
            />
        </InfoBlock>

        <InfoBlock layout='single-item' header='Ошибки'>
          <ErrorsFilter
            filters={errorsFilters}
            errors={errors}
            onClick={(id: string) => dispatch(errorToggled(id))}
            handleSelectAll={() => {
              const ids = errors.map(error => error.id)
              dispatch(errorsSelected(ids))
            }}
            handleUnselectAll={() => {
              dispatch(errorsUnselected())
            }}
            />
          {/* <RecipesFilter 
            filters={recipesFilters}
            recipes={errors}
            onClick={(id: number) => {
              // dispatch(recipeToggled(id))
            }}
          /> */}
        </InfoBlock>

      </div>
    </div>
  );
}
 
export default Settings;