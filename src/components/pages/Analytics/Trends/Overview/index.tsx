import React from 'react';
import Header from '~/components/blocks/Header';
import InfoBlock from '~/components/blocks/InfoBlock';

import './style.css';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';

import imgCoffee from './img/coffee.png';
import imgMilk from './img/milk.png';
import imgWater from './img/water.png';
import imgChocolate from './img/chocolate.png';

// Обертки инфо-блоков
import DispensingsByDay from './DispensingsByDay';  
import Consumptions from './Consumptinos';
import Cleanings from './Cleanings';
import AverageDispensingsPerMachine from './AverageDispensingsPerMachine';

const Overview = () => {
  const period = 55;
  // backgroundColor: '#3F3E43',
  // backgroundColor: '#999999',

  return (
    <div className='page page-analytics__trends__overview'>
      {/* <Header>Обзор</Header> */}
      <div className="page__content container">
        {/* Напитки по дням */}
        <DispensingsByDay />
        {/* Расход ингридиентов */}
        <Consumptions />
        {/* Очистки */}
        <Cleanings />
        {/* Среднее количество напитков на одну машину */}
        <AverageDispensingsPerMachine />
      </div>
    </div>
  );
}
 
export default Overview;




