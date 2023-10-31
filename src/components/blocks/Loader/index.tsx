import React from 'react';

import './style.css';

const Loader = () => {
  return (
    <div className="loader">
      <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
 
export default Loader;