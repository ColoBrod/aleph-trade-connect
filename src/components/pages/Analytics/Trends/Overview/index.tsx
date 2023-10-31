import React from 'react';
import Header from '~/components/blocks/Header';
import InfoBlock from '~/components/blocks/InfoBlock';

import './style.css';
import Widget from '~/components/elements/Widget';
import Diagram from '~/components/elements/Diagram';

import imgCoffee from './img/coffee.png';
import imgMilk from './img/milk.png';
import imgWater from './img/water.png';
import imgChocolate from './img/chocolate.png';

const Overview = () => {
  const period = 55;
  // backgroundColor: '#3F3E43',
  // backgroundColor: '#999999',

  return (
    <div className='page page-analytics__trends__overview'>

      <Header>Обзор</Header>

      <div className="page__content">

        {/* Напитки по дням */}
        <InfoBlock layout="chart" header='Напитки по дням'>
          <Diagram
            id="dispensings-by-day"
            type="bar"
            labels={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
            datasets={[
              {
                label: 'Текущая неделя',
                data: [13, 50, 32, 40, 35, 17, 28],

              },
              {
                label: 'Предыдущая неделя',
                data: [13, 50, 32, 40, 35, 17, 28],
              },
            ]}
          />
          <Widget 
            amount={223} 
            description="Выдач за текущую неделю"
            layout="chart"
          />
          <Widget 
            amount={527} 
            description="Выдач за предыдущую неделю"
            layout="chart"
          />
        </InfoBlock>

        {/* Расход ингридиентов */}
        <InfoBlock layout="grid-2x2" header='Расход ингридиентов'>
          <Widget 
            icon={imgWater}
            amount={506.39} 
            toFixed={true}
            description={<>Литров воды было использовано за последние {period} дней.</>}
            layout="dashboard"
          />
          <Widget 
            icon={imgMilk}
            amount={183.14} 
            toFixed={true}
            description={<>Литров молока было использовано за последние {period} дней.</>}
            layout="dashboard"
          />
          <Widget 
            icon={imgCoffee}
            amount={48.94} 
            toFixed={true}
            description={<>Кг. кофе было использовано за последние {period} дней.</>}
            layout="dashboard"
          />
          <Widget 
            icon={imgChocolate}
            amount={1.92} 
            toFixed={true}
            description={<>Кг. шоколада было использовано за последние {period} дней.</>}
            layout="dashboard"
          />
        </InfoBlock>

        {/* Очистки */}
        <InfoBlock layout="chart" header='Очистки'>
          <Diagram
            id="cleanings"
            type="bar"
            labels={["Читски"]}
            datasets={[
              {
                label: 'Текущая неделя',
                data: [0.94],
              },
              {
                label: 'Предыдущая неделя',
                data: [1.07],
              },
            ]}
          />
          <Widget 
            amount={0.94} 
            toFixed={true}
            description="Выдач за текущую неделю"
            layout="chart"
          />
          <Widget 
            amount={1.07} 
            toFixed={true}
            description="Выдач за предыдущую неделю"
            layout="chart"
          />
        </InfoBlock>

        {/* Среднее количество напитков на одну машину */}
        <InfoBlock layout="chart-solo" header='Среднее количество напитков на одну машину'>
          <Diagram
            id="average-dispensings-per-machine"
            type="bar"
            labels={["Среднее количество..."]}
            datasets={[
              {
                label: 'Москва',
                data: [312],
              },
              {
                label: 'Санкт-Петербург',
                data: [201],
              },
              {
                label: 'Воронеж',
                data: [48],
              },
            ]}
          />
        </InfoBlock>
      </div>
      {/* 
        TODO: Когда будет понятен окончательный выбор инструмента, убрать эти 
        IFrame
      */}
      {/* <Iframe 
        url="https://datalens.yandex/lzfn01fynp40a?_embedded=1&_no_controls=1&_lang=ru"
        frameBorder={0}
        width="100%" 
        height="400px"
      />
      <Iframe 
        url="https://datalens.yandex/s6m36b5kjr2ah?_embedded=1&_no_controls=1&_lang=ru"
        frameBorder={0}
        width="100%" 
        height="400px"
      /> */}
    </div>
  );
}
 
export default Overview;




