import React from 'react';
import Header from '~/components/blocks/Header';

import './style.css';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';
import Loader from '~/components/blocks/Loader';
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


