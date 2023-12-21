import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export interface Mark {
  restId: string;
  restName?: string;
  coffeeMachine: {
    name: string;
    serialNumber: string;
  };
  address?: string;
  lat: number;
  lon: number;
}

interface Props {
  width: string; // '130px' | '100%'
  height: string;
  mark: Mark;
}

const YandexMap = ({ width, height, mark }: Props) => (
  <YMaps>
    <Map defaultState={{ center: [mark.lon, mark.lat], zoom: 13 }} style={{ width, height }}>
      <Placemark 
        options={{
          preset: 'islands#circleIcon',
          iconColor: '#3caa3c',
        }}
        properties={{
          hintContent: mark.restName,
          balloonContentHeader: mark.restName,
          balloonContentBody: `${mark.coffeeMachine.name} - ${mark.coffeeMachine.serialNumber}`,
          balloonContentFooter: mark.address,
        }}
        defaultGeometry={[mark.lon, mark.lat]}
        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
        />
    </Map>
  </YMaps>
)

export default YandexMap;