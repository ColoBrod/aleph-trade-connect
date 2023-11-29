import React, { ChangeEventHandler } from 'react';

import './style.css'

interface Props {
  name: string;
  items: {
    value: string;
    innerHTML: string;
  }[];
  label?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  value?: string;
}

const DropDownList = (props: Props) => {
  const { name, items, label, onChange: handler, value } = props;
  
  return (
    <div className="ddl-outter">
      {
        label 
          ? <div className="ddl-label">
              {label}
            </div>
          : null
      }
      <div className="ddl-wrapper" >
        <select className="ddl" defaultValue={value} name={name} id={name} onChange={handler}>
          {
            items.map((item, i): React.ReactNode => 
              <option key={i} value={item.value}>{item.innerHTML}</option>
            )
          }
        </select>
      </div>
    </div>
  );
}
 
export default DropDownList;