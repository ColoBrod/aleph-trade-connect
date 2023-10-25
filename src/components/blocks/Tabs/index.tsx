import React, { ReactNode } from 'react';

import './style.css'

// Components
import Tab, { Props as TabProps }  from '~/components/elements/Tab';
import { TabsLayout } from '~/interfaces/blocks-and-elements';

interface Props {
  layout: TabsLayout;
  items: TabProps[];
}

const Tabs = (props: Props) => {
  const { layout, items } = props;
  if (items.length === 0) return null;
  return (
    <nav className={`tabs ${layout}`}>
      {
        items.map(item => <Tab key={item.path} path={item.path}>{item.children}</Tab>  )
      }
    </nav>
  );
}
 
export default Tabs;