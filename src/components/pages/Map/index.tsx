import React from 'react';
import Iframe from 'react-iframe';

const Map = () => {
  return (
    <Iframe 
      url='https://wmf24.ru/map'
      height='100%'
      frameBorder={0}
    />
  );
}
 
export default Map;