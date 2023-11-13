import React from 'react';
import Widget from '~/components/elements/Widget';

// Images
import imgCoffeeMaker from './img/coffee-maker.svg';
import imgClock from './img/clock.svg';
import imgCoffee from './img/coffee.svg';

const HeaderWidgets = () => {
  const period = 30;

  return (
    <div className="header-widgets">
      <Widget
        icon={imgCoffeeMaker}
        layout='header'
        amount={4}
        description={"Кофемашины"}
      />
      <Widget
        icon={imgCoffee}
        layout='header'
        amount={4120}
        description={<>За {period} дней</>}
      />
      <Widget
        icon={imgClock}
        layout='header'
        amount={"01.11.2023 14:55:46"}
        description={"Последнияя синхронизация"}
      />
    </div>
  );
}
 
export default HeaderWidgets;