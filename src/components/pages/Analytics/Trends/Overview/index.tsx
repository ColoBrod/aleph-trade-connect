import React from 'react';
import Iframe from 'react-iframe';
import Header from '~/components/blocks/Header';
import InfoBlock from '~/components/blocks/InfoBlock';

import './style.css';
import Widget from '~/components/elements/Widget';

const Overview = () => {

  return (
    <div className='page page-overview'>
      <Header>Overview</Header>

      <div className="page__content">
        <InfoBlock layout="chart" header='Напитки по дням'>
          <Widget />
          <Widget />
        </InfoBlock>
        <InfoBlock layout="chart" header='Расход ингридиентов'>
          
        </InfoBlock>
        <InfoBlock layout="chart" header='Очистки'>
          
        </InfoBlock>
        <InfoBlock layout="chart" header='Среднее количество напитков на одну машину'>
          
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




