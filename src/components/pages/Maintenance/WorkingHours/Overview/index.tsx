import React from 'react';
import './style.css'
import Header from '~/components/blocks/Header';
import InfoBlock from '~/components/blocks/InfoBlock';
import Diagram from '~/components/elements/Diagram';
import Widget from '~/components/elements/Widget';
import TimeRange from '~/components/elements/TimeRange';

const Overview = () => {
  const period = 30;

  return (
    <div className='page page-maintenance__working-hours__overview'>

      <Header>Обзор</Header>

      <div className="page__content">
        <InfoBlock layout='chart' header='Простои кофе-машин по часам'>
          <Diagram
            id="downtime-by-hours"
            type="bar"
            labels={["7","8","9","10","11","12","13","14","15","16","17","18","19","20","21"]}
            datasets={[
              {
                label: 'Сегодня',
                data: [0.5,0.6,0.2,1,0.3,0.4,0.45,0.15,0.7,0.8,0.32,0.17,0.26,0.37,0.40],

              },
              {
                label: 'Вчера',
                data: [0.29,0.34,0.1,1,1.2,0.45,0.13,0.47,0.22,0.05,0.9,0.36,0.2,0.71,0.8],
              },
            ]}
          />
          <Widget 
            amount={"1ч 32м"} 
            description={<>Сренднее время простоя одной к/м <b>сегодня</b></>}
            layout="chart"
          />
          <Widget 
            amount={"2ч 47м"} 
            description={<>Сренднее время простоя одной к/м <b>вчера</b></>}
            layout="chart"
          />

        </InfoBlock>

        <InfoBlock layout='chart-4' header='Причины простоев'>
          <Diagram 
            id="downtime-causes"
            type="doughnut"
            legend={true}
            labels={["26% поломка", "74% обслуживание"]}
            datasets={[
              {
                data: [26, 74],
              },
            ]}
          />
        </InfoBlock>

        <InfoBlock layout='chart-4' header='Наиболее популярные ошибки'>
          <Diagram 
            id="most-common-issues"
            type="bar"
            direction='horizontal'
            legend={false}
            labels={["Ошибка 1", "Ошибка 2", "Ошибка 3", "Ошибка 4", "Ошибка 5", "Ошибка 6"]}
            datasets={[
              {
                data: [315, 280, 245, 200, 146, 99],
              },
            ]}
          />
          <Widget 
            amount={"Ошибка 1"}
            description={<>самая популярная за последние <b>{period}</b> дней</>}
            layout='chart'
            align='center'
          />
        </InfoBlock>

        <InfoBlock layout='chart-timerange' header='Простои кофе-машин по дням'>
          <Diagram 
            id="downtimes-by-weekday-and-time"
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
            amount={"18ч 13м"}
            toFixed={true}
            description={<>простоя всего</>}
            layout='chart'
            align='center'
          />
          <TimeRange />
        </InfoBlock>

        <InfoBlock layout='chart-4' header='Неделя к неделе'>
          <Diagram 
            id="downtimes-week-to-week"
            type="bar"
            legend={false}
            labels={["Пред. неделя", "Тек. неделя"]}
            datasets={[
              {
                data: [527, 223],
              },
            ]}
          />
          <Widget 
            amount={"-58%"}
            description={<>меньше ошибок чем на <b>прошлой</b> неделе</>}
            layout='chart'
            align='center'
          />
        </InfoBlock>

        <InfoBlock layout='chart-4' header='По бизнес-юнитам'>
          <Diagram 
            id="downtimes-by-business-unit"
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
            description={<>Москва простаивает больше за последние <b>{period}</b> дней</>}
            layout='chart'
            align='center'
          />
        </InfoBlock>
      </div>
    </div>
  );
}
 
export default Overview;