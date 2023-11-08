import React, { ReactNode } from 'react';

import './style.css'

// Components
import Tab, { Props as TabProps }  from '~/components/elements/Tab';
import { TabsLayout } from '~/interfaces/blocks-and-elements';
import Widget from '~/components/elements/Widget';

// Images
import imgCoffeeMaker from './img/coffee-maker.svg';
import imgClock from './img/clock.svg';
import imgCoffee from './img/coffee.svg';

interface Props {
  layout: TabsLayout;
  items: TabProps[];
}

const Tabs = (props: Props) => {
  const { layout, items } = props;
  if (items.length === 0) return null;
  return (
    <nav className={`tabs tabs-${layout}`}>
      <div className="container">
        {
          items.map(item => <Tab layout={layout} key={item.path} path={item.path}>{item.children}</Tab>  )
        }
        {
          layout === 'bottom'
            ? <div className="header-widgets">
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
                  description={"За 30 дней"}
                />
                <Widget
                  icon={imgClock}
                  layout='header'
                  amount={"01.11.2023 14:55:46"}
                  description={"Последнияя синхронизация"}
                />
              </div>
            : null
        }
      </div>
    </nav>
  );
}
 
export default Tabs;