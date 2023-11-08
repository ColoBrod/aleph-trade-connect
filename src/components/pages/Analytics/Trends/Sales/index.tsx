import React from 'react';
import Header from '~/components/blocks/Header';

import './style.css';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';
import Loader from '~/components/blocks/Loader';
import TimeRange from '~/components/elements/TimeRange';
import DispensingsByDate from './DispensingsByDate';
import DispensingsByCupSize from './DispensingsByCupSize';
import DispensingsByRecipe from './DispensingsByRecipe';

const Sales = () => {
  const period = 30;

  return (
    <div className='page page-analytics__trends__sales'>
      <div className="page__content container">
        <DispensingsByDate />

        <DispensingsByCupSize />

        <DispensingsByRecipe />

        <InfoBlock layout="chart-timerange" header='Выдачи по дню недели и времени'>
          <Diagram 
            id="dispensings-by-weekday-and-time"
            type="bar"
            legend={false}
            labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
            datasets={[
              {
                data: [315, 200, 280, 245, 420, 146, 99],
              },
            ]}
          />
          <Widget 
            amount={"Пятница"}
            description={<>Самый популярный день недели за последние <b>{period}</b> дней</>}
            layout='chart'
            align='center'
          />
          <Widget 
            amount={"737"}
            description={<>Выдач всего</>}
            layout='chart'
            align='center'
          />
          <TimeRange />
        </InfoBlock>

        <InfoBlock layout="chart-4" header='Выдачи на прошлой и текущей неделе'>
          <Diagram 
            id="dispensings-week-to-week"
            type="bar"
            legend={false}
            labels={["Предыдущая неделя", "Текущая неделя"]}
            datasets={[
              {
                data: [527, 223],
              },
            ]}
          />
          <Widget 
            amount={"-58%"}
            description={<>Dispensings are missing this week to beat the last week's total</>}
            layout='chart'
            align='center'
          />
        </InfoBlock>

        <InfoBlock layout="chart-4" header='Выдачи по городам'>
          <Diagram 
            id="dispensings-by-business-unit"
            type="bar"
            direction='horizontal'
            legend={false}
            labels={["Москва", "Санкт-Петербург"]}
            datasets={[
              {
                data: [360, 270],
              },
            ]}
          />
          <Widget 
            amount={"Москва"}
            description={<>Performs best within the last <b>{period}</b> days</>}
            layout='chart'
            align='center'
          />
        </InfoBlock>
      </div>
    </div>
  );
}
 
export default Sales;


