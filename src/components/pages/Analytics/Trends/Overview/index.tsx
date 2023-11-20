import React from 'react';

import './style.css';

// Обертки инфо-блоков
import DispensingsByDay from './DispensingsByDay';  
import Consumptions from './Consumptinos';
import Cleanings from './Cleanings';
import AverageDispensingsPerMachine from './AverageDispensingsPerMachine';

const Overview = () => {
  const period = 55;

  return (
    <div className='page page-analytics__trends__overview'>
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




