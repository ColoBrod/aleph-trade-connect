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
  businessUnitsFilterChanged 
} from '~/store/filters/analytics';
import { recipeToggled } from '~/store/filters/analytics/trends';
import { coffeeMachineModelSelected } from '~/store/filters/analytics';

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
  };
  const { recipes: recipesFilters } = useAppSelector(
    state => state.filters.analytics.trends
  );
  // const checked = businessUnits.map(unit => {
  //   if (unit.type === 0) return unit.id.toString();
  // });

  const dispatch = useAppDispatch()
  const filtersCoffeeMachineModels = useAppSelector(
    state => state.filters.analytics.common.coffeeMachineModels.list
  );
  
  return (
    <div className="page page-analytics__trends__settings">
      <div className="page__content container">
        
        <InfoBlock layout='info' header='Обратите внимание: данные доступны только за последние 62 дня'>
        </InfoBlock>

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
          <DateRange />
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
          />
        </InfoBlock>

      </div>
    </div>
  );
}
 
export default Settings;