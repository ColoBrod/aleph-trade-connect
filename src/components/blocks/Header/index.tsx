import React from 'react';

import './style.css';

interface Props {
  children: string;
}

const Header = (props: Props) => {
  const { children } = props;
  return (
    <div className="page__header">
      <h1>{children}</h1>
    </div>
  );
}
 
export default Header;