import React, { useEffect } from 'react';

import './style.css';
import InfoBlock from '~/components/blocks/InfoBlock';
import RegionTree from '~/components/blocks/RegionTree'; 
import DateRange from '~/components/elements/DateRange';
import CoffeeMachineFilter from '~/components/blocks/CoffeeMachineFilter';
import RecipesFilter from '~/components/blocks/RecipesFilter';

import { useAppSelector, useAppDispatch } from '~/hooks';
import { 
  businessUnitsSet, 
  businessUnitsExpanded, 
  businessUnitsFilterChanged,
  businessUnitsSelectedAll,
} from '~/store/filters/analytics';
import { recipeToggled, recipesSelected, recipesUnselected } from '~/store/filters/analytics/trends';
import { coffeeMachineModelSelected } from '~/store/filters/analytics';
import { dateRangeSet } from '~/store/filters/analytics/trends';

const Settings = () => {
  const { recipes, businessUnits, coffeeMachineModels } = useAppSelector(
    state => state.entities.data
  );
  const { businessUnits: businessUnitsFilters } = useAppSelector(
    state => state.filters.analytics.common
  );
  const businessUnitsActions = {
    businessUnitsSet,
    businessUnitsExpanded,
    businessUnitsFilterChanged,
    businessUnitsSelectedAll,
  };
  const { recipes: recipesFilters, dateRange } = useAppSelector(
    state => state.filters.analytics.trends
  );
  // const checked = businessUnits.map(unit => {
  //   if (unit.type === 0) return unit.id.toString();
  // });

  const dispatch = useAppDispatch()
  const filtersCoffeeMachineModels = useAppSelector(
    state => state.filters.analytics.common.coffeeMachineModels.list
  );

  // console.log(businessUnits);
  
  return (
    <div className="page page-analytics__trends__settings page-shared__settings">
      <div className="page__content container">
        
        {/* <InfoBlock layout='info' header='Обратите внимание: данные доступны только за последние 62 дня'>
        </InfoBlock> */}

        <InfoBlock layout='single-item' header='Структура ресторанов'>
          <RegionTree 
            path='analytics/trends'
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

        <InfoBlock layout='single-item' header='Рецепты'>
          <RecipesFilter 
            filters={recipesFilters}
            recipes={recipes}
            onClick={(id: number) => {
              dispatch(recipeToggled(id))
            }}
            handleSelectAll={() => {

              const ids = recipes.map(recipe => recipe.id)
              console.log(ids)
              dispatch(recipesSelected(ids))
            }}
            handleUnselectAll={() => {
              dispatch(recipesUnselected())
            }}
          />
        </InfoBlock>

      </div>
    </div>
  );
}
 
export default Settings;