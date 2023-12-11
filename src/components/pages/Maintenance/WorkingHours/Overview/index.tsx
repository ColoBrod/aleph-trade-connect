import React from 'react';
import './style.css'
import InfoBlock from '~/components/blocks/InfoBlock';
import Diagram from '~/components/elements/Diagram';
import Widget from '~/components/elements/Widget';
import TimeRange from '~/components/elements/TimeRange';
import { COLOR_1, COLOR_2, COLOR_3 } from '~/components/elements/Diagram/colors';

import DowntimeByHours from './DowntimeByHours';
import DowntimeCauses from './DowntimeCauses';
import DowntimeErrors from './DowntimeErrors';
import DowntimeByWeekdayAndTime from './DowntimeByWeekdayAndTime';
import DowntimeByWeek from './DowntimeByWeek';
import DowntimeByPath from './DowntimeByPath';

const Overview = () => {
  const period = 30;

  return (
    <div className='page page-maintenance__working-hours__overview'>
      <div className="page__content container">
      
        {/* Простои по часам */}
        <DowntimeByHours />
        {/* Причиные простоев */}
        <DowntimeCauses />
        {/* Наиболее популярные ошибки */}
        <DowntimeErrors />
        {/* Простои по дням */}
        <DowntimeByWeekdayAndTime />
        {/* Неделя к неделе */}
        {/* По бизнес-юнитам */}


        

        

        

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