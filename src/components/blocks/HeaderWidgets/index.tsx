import React from 'react';
import Widget from '~/components/elements/Widget';

// Images
import imgCoffeeMaker from './img/coffee-maker.svg';
import imgClock from './img/clock.svg';
import imgCoffee from './img/coffee.svg';

// Redux
import { useAppSelector } from '~/hooks';

// Format period
import { getPeriod } from '~/store/selectors';

const HeaderWidgets = () => {
  const { dateRange } = useAppSelector(state => state.filters.analytics.trends)
  const period = getPeriod(dateRange, "short");

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
        description={<>За {period}</>}
      />
      <Widget
        icon={imgClock}
        layout='header'
        amount={"01.11.2023 14:55:46"}
        description={"Последняя синхронизация"}
      />
    </div>
  );
}
 
export default HeaderWidgets;