import React from 'react';
import Header from '~/components/blocks/Header';
import InfoBlock from '~/components/blocks/InfoBlock';

import './style.css';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';

import imgBeverage from './img/beverage.png';
import imgCalendar from './img/calendar.png';
import imgClock from './img/clock.png';
import imgDispensing from './img/dispensing.png';
import RegionTree from '~/components/blocks/RegionTree';

const DaylyReports = () => {
  const period = 55;
  // backgroundColor: '#3F3E43',
  // backgroundColor: '#999999',

  return (
    <div className='page page-analytics__dayly-reports'>

      <Header>Ежедневные отчеты</Header>

      <div className="page__content">

        <div className="filters">
          <RegionTree />
        </div>

        {/* Напитки по ресторанам */}
        <InfoBlock layout="chart-2" header='Напитки по ресторанам'>
          <Widget 
            amount={"Бургер-РУС 3276"}
            description={`Лучшие рестораны за последние ${period} дней`}
            layout='chart'
            align='left'
          />
          <Diagram 
            id="dispensings-by-rest"
            type="bar"
            direction="horizontal"
            legend={false}
            labels={["Бургер-РУС 3276", "Бургер-РУС 2000", "Бургер-РУС 1723", "Бургер-РУС 1313", "Бургер-РУС 1400", "Бургер-РУС 1500"]}
            datasets={[
              {
                // label: 'Бургер-РУС 3276',
                data: [848, 700, 403, 710, 560, 320],
              },
            ]}
          />
        </InfoBlock>

        {/* Соблюдение правил чистки ресторанами */}
        <InfoBlock layout="chart-2" header='Соблюдение правил чистки ресторанами'>
          <Widget 
            amount={"Бургер-РУС 3276"}
            description={`Самый недисциплинированный ресторан за последние ${period} дней`}
            layout='chart'
            align='left'
          />
          <Diagram 
            id="cleanings-by-rest"
            type="bar"
            direction="horizontal"
            legend={false}
            labels={["Бургер-РУС 3276", "Бургер-РУС 2000", "Бургер-РУС 1723", "Бургер-РУС 1313", "Бургер-РУС 1400", "Бургер-РУС 1500"]}
            datasets={[
              {
                // label: 'Бургер-РУС 3276',
                data: [0.95, 0.45, 0.4, 0.2, 0.56, 1.20],
              },
            ]}
          />
        </InfoBlock>

        {/* Напитки по часам */}
        <InfoBlock layout="chart-3" header='Напитки по часам'>
          <Widget 
            icon={imgClock}
            amount={"09:00"}
            description={`Самый популярный час последние ${period} дней`}
            layout='chart-icon'
            align='left'
          />
          <Widget 
            icon={imgBeverage}
            amount={98}
            description={`В среднем трятятся за эти часы. Часы без выдачи исключены`}
            layout='chart-icon'
            align='left'
          />
          <Diagram 
            id="dispensings-by-hours"
            type="bar"
            direction="vertical"
            legend={false}
            labels={["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"]}
            datasets={[
              {
                // label: 'Бургер-РУС 3276',
                data: [15, 16, 30, 24, 17, 21, 40, 15, 16, 30, 24, 17, 21, 40],
              },
            ]}
          />
        </InfoBlock>

        {/* Напитки по дням */}
        <InfoBlock layout="chart-3" header='Напитки по дням'>
          <Widget 
            icon={imgCalendar}
            amount={"Вторник"}
            description={`Самый популярный день за рассматриваемые ${period} дней`}
            layout='chart-icon'
            align='left'
          />
          <Widget 
            icon={imgBeverage}
            amount={"337 раздач"}
            description={`Обслужили в среднем за день`}
            layout='chart-icon'
            align='left'
          />
          <Diagram 
            id="dispensings-by-days"
            type="bar"
            direction="horizontal"
            legend={false}
            labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
            datasets={[
              {
                // label: 'Бургер-РУС 3276',
                data: [246, 217, 310, 280, 190, 256, 263],
              },
            ]}
          />
        </InfoBlock>

        {/* Напитки по рецепту */}
        <InfoBlock layout="chart-2" header='Напитки по рецепту'>
          <Widget 
            icon={imgBeverage}
            amount={"Американо 200мл"}
            description={`Самый популярный рецепт за последние ${period} дней`}
            layout='chart-icon'
            align='left'
          />
          <Diagram 
            id="dispensings-by-recipe"
            type="bar"
            direction="horizontal"
            legend={false}
            labels={["Американо 200мл", "Капучино 200мл", "Капучино 200мл", "Капучино 200мл", "Капучино 200мл", "Капучино 200мл", "Капучино 200мл"]}
            datasets={[
              {
                data: [513, 217, 310, 280, 190, 256, 263],
              },
            ]}
          />
        </InfoBlock>
        
        {/* Напитки по размеру чашки */}
        <InfoBlock layout="chart-3" header='Напитки по размеру чашки'>
          <Widget 
            icon={imgDispensing}
            amount={"2358 раздачи"}
            description={`Были поданы чашки размера Regular за последние ${period} дней`}
            layout='chart-icon'
            align='left'
          />
          <Widget 
            icon={imgBeverage}
            amount={"Американо 200мл"}
            description={`Самый популярный рецепт для чашки обычного размера`}
            layout='chart-icon'
            align='left'
          />
          <Diagram 
            id="beverages-by-cup-size"
            type="doughnut"
            legend={true}
            labels={["Small", "Medium", "Large"]}
            datasets={[
              {
                data: [300, 500, 200],
              },
            ]}
          />
        </InfoBlock>


      </div>
    </div>
  );
}
 
export default DaylyReports;




