import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '~/hooks';

import {
  visibilitySet,
  tabSet,
  coffeeMachineSet
} from '~/store/ui/modal-box';

interface Mark {
  restId: string;
  restName?: string;
  coffeeMachines: {
    name: string;
    serialNumber: string;
  }[];
  address?: string;
  lat: number;
  lon: number;
}

const MapPage = () => {

  const { coffeeMachines, businessUnits } = useAppSelector(state => state.entities.data);
  const marks: Mark[] = []
  const dispatch = useAppDispatch();

  coffeeMachines.forEach((cm, i) => {
    const rest = businessUnits.find(bu => cm.restaurantId === bu.id);
    if (rest === undefined) return;
    // Если ресторан уже есть в списке меток
    const mark = marks.find(m => rest.id === m.restId);
    if (mark) mark.coffeeMachines.push({
      name: cm.name,
      serialNumber: cm.serialNumber,
    })
    // Завести новую метку
    else if (rest.lat && rest.lon) marks.push({
      restId: rest.id,
      restName: rest.name,
      address: rest.address,
      coffeeMachines: [{
        name: cm.name,
        serialNumber: cm.serialNumber,
      }],
      lat: parseFloat(rest.lat),
      lon: parseFloat(rest.lon),
    })
  });

  console.log(marks);

  const showModalBox = (serialNumber: string) => {
    if (!serialNumber || !coffeeMachines) return;
    const coffeeMachine = 
      coffeeMachines.find(cm => cm.serialNumber === serialNumber)
    if (coffeeMachine === undefined) return;
    dispatch(coffeeMachineSet(coffeeMachine));
    dispatch(visibilitySet(true));
    dispatch(tabSet('general'));
  }

  return (
    <YMaps>
      <Map defaultState={{ center: [55.75, 37.60], zoom: 13 }} style={{ width: "100%", height: "100%" }}>
        {
          marks.map((mark, i) => {
            let balloonContentBody = "";
            mark.coffeeMachines.forEach(cm => 
              balloonContentBody += `${cm.name} <a href="?coffee-machine=${cm.serialNumber}" >${cm.serialNumber}</a><br>`
              // balloonContentBody += <a href="">{cm.serialNumber}</a>
              // `${cm.name} <a onclick={${() => showModalBox(cm.serialNumber)}}" >${cm.serialNumber}</a><br>`
            )

            return (
              <Placemark
                key={i}
                // defaultOptions={{
                //   // openHintOnHover: 
                //   openHintOnHover: true,
                //   preset: 'islands#circleIcon',
                //   iconColor: '#3caa3c',
                // }}
                options={{
                  preset: 'islands#circleIcon',
                  iconColor: '#3caa3c',
                }}
                properties={{
                  hintContent: mark.restName,
                  balloonContentHeader: mark.restName,
                  // balloonContent: 'Это балун',
                  // balloonContent: "test",
                  // balloonContentBody: `Содержимое <a href="https://google.com">ballon</a> метки`,
                  balloonContentBody,
                  balloonContentFooter: mark.address,
                  // hintContent: mark.text,
                }}
                defaultGeometry={[mark.lon, mark.lat]}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                />
            )
          })
        }
      </Map>
    </YMaps>
  );
}


/**
 * <Placemark
      key={i}
      defaultOptions={{
        // openHintOnHover: 
        openHintOnHover: true,
        iconLayout: 'default#image',
        iconImageHref: imgActive,
        iconImageSize: [44, 44],
        iconImageOffset: [-22, -22],
      }}
      properties={{
        balloonContentHeader: "Балун метки",
        balloonContentBody: "Содержимое <em>балуна</em> метки",
        balloonContentFooter: "Подвал",
        hintContent: mark.text,
      }}
      defaultGeometry={[mark.lon, mark.lat]}
      
      />
 */


  // {
  // <Placemark 
  //   defaultOptions={{
  //     balloonContent: 'А эта — новогодняя',
  //     // iconColor: 'red',
  //     iconLayout: 'default#image',
  //     iconImageHref: imgActive,
  //     iconImageSize: [40, 40],
  //     iconImageOffset: [-20, -20],
  //   }}
  //   defaultGeometry={[55.751574, 37.573856]} 
  //   />
  // }  

  // <Iframe 
  //   url='https://wmf24.ru/map'
  //   height='100%'
  //   frameBorder={0}
  // />

// myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
//   hintContent: 'Собственный значок метки с контентом',
//   balloonContent: 'А эта — новогодняя',
//   iconContent: '12'
// }, {
//   // Опции.
//   // Необходимо указать данный тип макета.
//   iconLayout: 'default#imageWithContent',
//   // Своё изображение иконки метки.
//   iconImageHref: 'images/ball.png',
//   // Размеры метки.
//   iconImageSize: [48, 48],
//   // Смещение левого верхнего угла иконки относительно
//   // её "ножки" (точки привязки).
//   iconImageOffset: [-24, -24],
//   // Смещение слоя с содержимым относительно слоя с картинкой.
//   iconContentOffset: [15, 15],
//   // Макет содержимого.
//   iconContentLayout: MyIconContentLayout
// });

export default MapPage;