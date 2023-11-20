import React from 'react';

import './style.css';
import InfoBlock from '~/components/blocks/InfoBlock';
import RegionTree from '~/components/blocks/RegionTree';
import DateRange from '~/components/elements/DateRange';
import CoffeeMachineFilter from '~/components/blocks/CoffeeMachineFilter';
import RecipesFilter from '~/components/blocks/RecipesFilter';

const Settings = () => {
  return (
    <div className="page page-analytics__trends__settings">
      <div className="page__content container">
        
        <InfoBlock layout='info' header='Обратите внимание: данные доступны только за последние 62 дня'>
        </InfoBlock>

        <InfoBlock layout='single-item' header='Структура ресторанов'>
          <RegionTree />
        </InfoBlock>

        <InfoBlock layout='single-item' header='Период данных'>
          <DateRange />
        </InfoBlock>

        <InfoBlock layout='single-item' header='Модель кофе-машины'>
          <CoffeeMachineFilter />
        </InfoBlock>

        <InfoBlock layout='single-item' header='Рецепты'>
          <RecipesFilter />
        </InfoBlock>

      </div>
    </div>
  );
}
 
export default Settings;