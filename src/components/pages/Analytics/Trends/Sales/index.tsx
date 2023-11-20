import React from 'react';

import './style.css';
// import TimeRange from '~/components/elements/TimeRange';
import DispensingsByDate from './DispensingsByDate';
import DispensingsByCupSize from './DispensingsByCupSize';
import DispensingsByRecipe from './DispensingsByRecipe';
import DispensingsByWeekdayAndTime from './DispensingsByWeekDayAndTime';
import DispensingsByWeek from './DispensingsByWeek';
import DispensingsByPath from './DispensingsByPath';

const Sales = () => {
  return (
    <div className='page page-analytics__trends__sales'>
      <div className="page__content container">
        <DispensingsByDate />
        <DispensingsByCupSize />
        <DispensingsByRecipe />
        <DispensingsByWeekdayAndTime />
        <DispensingsByWeek />
        <DispensingsByPath />
      </div>
    </div>
  );
}
 
export default Sales;


