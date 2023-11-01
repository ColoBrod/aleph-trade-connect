import React from 'react';
import Header from '~/components/blocks/Header';

import './style.css';
import InfoBlock from '~/components/blocks/InfoBlock';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';
import Loader from '~/components/blocks/Loader';
import TimeRange from '~/components/elements/TimeRange';

const Sales = () => {
  const period = 30;

  return (
    <div className='page page-analytics__trends__sales'>

      <Header>Продажи</Header>

      <div className="page__content">
        <InfoBlock layout="chart" header='Напитки по дням'>
          <Diagram 
            id="dispensings-by-days"
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

        <InfoBlock layout="chart-4" header='Выдачи по размеру чашки (S-M-L)'>
          <Diagram 
            id="dispensings-by-cup-size"
            type="doughnut"
            legend={false}
            labels={["S", "M", "L"]}
            datasets={[
              {
                data: [315, 200, 146],
              },
            ]}
          />
          <Widget 
            amount={"Regular"}
            description={`Самый популярный размер чашки`}
            layout='chart'
            align='center'
          />
        </InfoBlock>

        <InfoBlock layout="chart-4" header='Выдачи по рецептам'>
          <Diagram 
            id="dispensings-by-recipe"
            type="bar"
            direction='horizontal'
            legend={false}
            labels={["Американо 200мл", "Капучино 400мл", "Капучино 200мл", "Латте 400мл", "Эспрессо 20мл", "Эспрессо 40мл"]}
            datasets={[
              {
                data: [315, 280, 245, 200, 146, 99],
              },
            ]}
          />
          <Widget 
            amount={"Американо 200мл"}
            description={<>Самый популярный рецепт за последние <b>{period}</b> дней</>}
            layout='chart'
            align='center'
          />
        </InfoBlock>

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


