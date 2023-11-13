import React, { ReactNode } from 'react';
import { MEDIA_LG_MIN } from '~/media-queries';
// import { useMediaQuery } from 'react-responsive';
import { use_LG_MIN } from '~/media-queries';

import './style.css'

// Components
import Tab, { Props as TabProps }  from '~/components/elements/Tab';
import { TabsLayout } from '~/interfaces/blocks-and-elements';
import Widget from '~/components/elements/Widget';
import HeaderWidgets from '../HeaderWidgets';


interface Props {
  layout: TabsLayout;
  items: TabProps[];
}

const Tabs = (props: Props) => {
  const { layout, items } = props;

  // const lgMin = useMediaQuery({
  //   query: `(min-width: ${MEDIA_LG_MIN}px)`,
  // });

  const lgMin = use_LG_MIN();

  if (items.length === 0) return null;
  return (
    <nav className={`tabs tabs-${layout}`}>
      <div className="container">
        {
          items.map(item => <Tab layout={layout} key={item.path} path={item.path}>{item.children}</Tab>  )
        }
        {
          layout === 'bottom' && lgMin
            ? <HeaderWidgets />
            : null
        }
      </div>
    </nav>
  );
}
 
export default Tabs;