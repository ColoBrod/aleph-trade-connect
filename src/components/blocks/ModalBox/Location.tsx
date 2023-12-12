import React from "react";
import Iframe from 'react-iframe';
import './Location.css'

interface Props {

}

const Location = ({}: Props) => {
  return (
    <div className="modal-box__page modal-box__page-location">
      <section id="map">
        <Iframe url='https://wmf24.ru/map' frameBorder={0} />
      </section>
      <section id="current-location">
        <div className="title">Текущее местоположение</div>
        <div className="item">
          <div className="item__title">Широта/Долгота</div>
          <div className="item__content">55.880458, 37.4431227</div>
        </div>
        <div className="item">
          <div className="item__title">Адрес</div>
          <div className="item__content">Ленинградское шоссе вл. 77А, Москва</div>
        </div>
      </section>
      <section id="business-unit">
        <div className="title">Бизнес единица</div>
        <div className="item">
          <div className="item__content">Центральный/Москва</div>
        </div>
      </section>

    </div>
  )
}

export default Location;


