import React from "react";
// import Iframe from 'react-iframe';
import YandexMap, {Mark} from "../YandexMap";
import './Location.css'
import { useAppSelector } from "~/hooks";

interface Props {

}

const Location = ({}: Props) => {
  const { coffeeMachine } = useAppSelector((state) => state.ui.modalBox);
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const restaurant = businessUnits.find(bu => bu.id === coffeeMachine?.restaurantId);
  if (!coffeeMachine || !restaurant || !restaurant.lat || !restaurant.lon) return null;
  const mark: Mark = {
    restId: restaurant?.id ? restaurant.id : "",
    restName: restaurant?.name,
    coffeeMachine: {
      name: coffeeMachine.name,
      serialNumber: coffeeMachine.serialNumber,
    },
    address: restaurant.address,
    lat: parseFloat(restaurant.lat),
    lon: parseFloat(restaurant.lon),
  }

  return (
    <div className="modal-box__page modal-box__page-location">
      <section id="map">
        <YandexMap width="100%" height="100%" mark={mark} />
        {/* <Iframe url='https://wmf24.ru/map' frameBorder={0} /> */}
      </section>
      <div className="horizontal">
        <div className="vertical">
          <section id="current-location">
            <div className="title">Текущее местоположение</div>
            <div className="item">
              <div className="item__title">Широта/Долгота</div>
              <div className="item__content">{restaurant.lat}, {restaurant.lon}</div>
            </div>
            <div className="item">
              <div className="item__title">Адрес</div>
              <div className="item__content">{restaurant.address}</div>
            </div>
          </section>
        </div>
        <div className="vertical">
          <section id="business-unit">
            <div className="title">Бизнес единица</div>
            <div className="item">
              <div className="item__content">Центральный/Москва</div>
            </div>
          </section>
        </div>
      </div>
      
      

    </div>
  )
}

export default Location;


