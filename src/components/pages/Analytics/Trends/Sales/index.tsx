import React from 'react';
import Header from '~/components/blocks/Header';

import './style.css';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';
import Loader from '~/components/blocks/Loader';

const Sales = () => {
  const period = 30;

  return (
    <div className='page page-analytics__trends__sales'>

      <Header>Продажи</Header>

      <div className="page__content">
        <InfoBlock layout="chart" header='Напитки по дням'>
          <Diagram 
            id="dispensings-by-rest"
            type="line"
            legend={false}
            labels={["1 ноября 2023", "2 ноября 2023", "3 ноября 2023", "4 ноября 2023", "5 ноября 2023", "6 ноября 2023", "7 ноября 2023", "8 ноября 2023", "9 ноября 2023", "10 ноября 2023", "11 ноября 2023", "12 ноября 2023", "13 ноября 2023", "14 ноября 2023", "15 ноября 2023", "16 ноября 2023", "17 ноября 2023", "18 ноября 2023", "19 ноября 2023", "20 ноября 2023", "21 ноября 2023", "22 ноября 2023", "23 ноября 2023", "24 ноября 2023", "25 ноября 2023", "26 ноября 2023", "27 ноября 2023", "28 ноября 2023", "29 ноября 2023", "30 ноября 2023"]}
            datasets={[
              {
                data: [159, 175, 122, 133, 102, 142, 143, 125, 149, 184, 187, 188, 142, 162, 164, 200, 163, 130, 131, 147, 149, 102, 193, 166, 144, 173, 197, 187, 175, 181],
              },
            ]}
            scales={{
              y: { min: 0 },
            }}
            
          />
          <Widget 
            amount={"4122"}
            description={`Приготовлено напитков за последние ${period} дней`}
            layout='chart'
            align='center'
          />
        </InfoBlock>

        <InfoBlock layout="chart-2" header='Выдачи по размеру чашки'>
          <Loader />
        </InfoBlock>

        <InfoBlock layout="chart-2" header='Выдачи по рецептам'>
          
        </InfoBlock>

        <InfoBlock layout="chart-2" header='Выдачи по дню недели и времени'>
          
        </InfoBlock>

        <InfoBlock layout="chart-2" header='Выдачи на прошлой и текущей неделе'>
          
        </InfoBlock>

        <InfoBlock layout="chart-2" header='Выдачи по городам'>
          
        </InfoBlock>
      </div>
    </div>
  );
}
 
export default Sales;


