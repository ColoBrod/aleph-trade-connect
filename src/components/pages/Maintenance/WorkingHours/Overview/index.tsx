import React from 'react';
import './style.css'
import InfoBlock from '~/components/blocks/InfoBlock';
import Diagram from '~/components/elements/Diagram';
import Widget from '~/components/elements/Widget';
import TimeRange from '~/components/elements/TimeRange';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';

const Overview = () => {
  const period = 30;

  return (
    <div className='page page-maintenance__working-hours__overview'>
      <div className="page__content container">
        <InfoBlock layout='chart' header='Простои по часам'>
          <Diagram
            id="downtime-by-hours"
            type="bar"
            labels={["7","8","9","10","11","12","13","14","15","16","17","18","19","20","21"]}
            datasets={[
              {
                label: 'Сегодня',
                data: [0.5,0.6,0.2,1,0.3,0.4,0.45,0.15,0.7,0.8,0.32,0.17,0.26,0.37,0.40],
                backgroundColor: COLOR_1,
                barThickness: 17,
              },
              {
                label: 'Вчера',
                data: [0.29,0.34,0.1,1,1.2,0.45,0.13,0.47,0.22,0.05,0.9,0.36,0.2,0.71,0.8],
                backgroundColor: COLOR_2,
                barThickness: 17,
              },
            ]}
            scales={{
              x: {
                grid: {
                  display: false,
                }
              },
              y: {
                border: { dash: [4, 4] },
              }
            }}
            width={'1150px'}
          />
          <Widget 
            amount={"1ч 32м"} 
            description={<>Сренднее время простоя одной машины <b>сегодня</b></>}
            layout="chart"
          />
          <Widget 
            amount={"2ч 47м"} 
            description={<>Сренднее время простоя одной машины <b>вчера</b></>}
            layout="chart"
          />

        </InfoBlock>

        <InfoBlock layout='downtime-causes' header='Причины простоев'>
          <Diagram 
            id="downtime-causes"
            type="doughnut"
            legend={false}
            labels={["26% поломка", "74% обслуживание"]}
            datasets={[
              {
                data: [26, 74],
                backgroundColor: [COLOR_1, COLOR_2],
              },
            ]}
            doughnutInner={<><span className="cup-size">Обслуживание</span><br /><span className='dispensings'>74%</span></>}
          />
          <Widget 
            layout='downtime-cause'
            amount='74%'
            description="обслуживание"
            align='center'
            />
          <Widget 
            layout='downtime-cause'
            amount='26%'
            description="поломка"
            align='center'
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
                barThickness: 13,
                backgroundColor: COLOR_3,
              },
            ]}
          />
          <Widget 
            amount={"Ошибка 1"}
            description={<>Самые популярные за последние <b>{period}</b> дней</>}
            layout='description'
            align='left'
          />
        </InfoBlock>

        <InfoBlock layout='chart-timerange' header='Простои по дням'>
          <Diagram 
            id="downtimes-by-weekday-and-time"
            type="bar"
            legend={false}
            labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
            datasets={[
              {
                data: [315, 200, 280, 245, 420, 146, 99],
                barThickness: 40,
                backgroundColor: COLOR_2,
              },
            ]}
            scales={{
              x: {
                grid: {
                  display: false,
                }
              },
              y: {
                border: { dash: [4, 4] },
              }
            }}
          />
          <Widget 
            amount={"Пятница"}
            description={<>Наиболее популярный день недели за последние <b>{period}</b> дней</>}
            layout='chart-doughnut'
            align='center'
          />
          <Widget 
            amount={"18ч 13м"}
            toFixed={true}
            description={<>простоя всего</>}
            layout='chart-doughnut'
            align='center'
          />
          <TimeRange />
        </InfoBlock>

        <InfoBlock layout='chart-4' header='Неделя к неделе'>
          <Diagram 
            id="downtimes-week-to-week"
            type="bar"
            legend={false}
            labels={["Предыдущая", "Текущая"]}
            datasets={[
              {
                data: [527, 223],
                backgroundColor: [COLOR_2, COLOR_1],
                barThickness: 64,
                categoryPercentage: 1,
              },
            ]}
            scales={{
              x: {
                grid: {
                  display: false,
                }
              },
              y: {
                border: { dash: [4, 4] },
              }
            }}
          />
          <Widget 
            amount={"-58%"}
            description={<>меньше ошибок чем на <b>прошлой</b> неделе</>}
            layout='week-to-week'
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
                backgroundColor: COLOR_3,
                barThickness: 36,
              },
            ]}
            scales={{
              y: {
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                }
              },
              x: { 
                min: 0, 
                border: { dash: [4, 4] },
              },
            }}
            innerBarText={{
              display: true,
              pos: 'left',
            }}
          />
          <Widget 
            amount={"Москва"}
            description={<>Москва самая простаивающая за последние <b>{period}</b> дней</>}
            layout='dayly-reports'
            align='left'
          />
        </InfoBlock>
      </div>
    </div>
  );
}
 
export default Overview;