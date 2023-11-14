import React from 'react';
import InfoBlock from '~/components/blocks/InfoBlock';

import './style.css';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';

import imgBeverage from './img/beverage.svg';
import imgBeverage40 from './img/beverage-40.svg';
import imgDispensing40 from './img/dispensing-40.svg';
import imgCalendar from './img/calendar.svg';
import imgClock from './img/clock.svg';
// import imgDispensing from './img/dispensing.png';

import FiltersAside from '~/components/blocks/FiltersAside';

import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';
import DispensingsByRestaurant from './DispensingsByRestaurant';
import DispensingsByHour from './DispensingsByHours';
import CleaningsByRestaurant from './CleaningsByRestaurant';
import DispensingsByWeekday from './DispensiingsByWeekday';
import DispensingsByRecipe from './DispensingsByRecipe';
import DispensingsByCupSize from './DispensingsByCupSize';

const DaylyReports = () => {
  const period = 55;

  

  return (
    <div className='page page-analytics__dayly-reports'>

      <div className="page__content container container-left">

        <FiltersAside />

        {/* Напитки по ресторанам */}
        <DispensingsByRestaurant />
        {/* Соблюдение правил чистки ресторанами */}
        {/* TODO: Динамически расчитывать высоту графика */}
        <CleaningsByRestaurant />
        {/* Напитки по часам */}
        <DispensingsByHour />

        {/* Напитки по дням */}
        <DispensingsByWeekday />

        {/* Напитки по рецепту */}
        <DispensingsByRecipe />
        
        {/* Напитки по размеру чашки */}
        <DispensingsByCupSize />
        {/* <InfoBlock layout="chart-7" header='Напитки по размеру чашки'>
          <Diagram 
            id="beverages-by-cup-size"
            type="doughnut"
            legend={false}
            labels={["Small", "Medium", "Large"]}
            datasets={[
              {
                data: [300, 500, 200],
                backgroundColor: [COLOR_1, COLOR_2, COLOR_3]
              },
            ]}
            doughnutInner={<>
              <span className="cup-size">{"Medium"}</span><br />
              <span className='dispensings'>{"50%"}</span>
            </>}
          />
          <Widget 
            icon={imgBeverage40}
            amount={"2358 раздачи"}
            description={`Были поданы чашки размера Regular за последние ${period} дней`}
            layout='dayly-reports-3'
            align='center'
          />
          <Widget 
            icon={imgDispensing40}
            amount={"Американо 200мл"}
            description={`Самый популярный рецепт для чашки обычного размера`}
            layout='dayly-reports-3'
            align='center'
          />
        </InfoBlock> */}


      </div>
    </div>
  );
}
 
export default DaylyReports;




