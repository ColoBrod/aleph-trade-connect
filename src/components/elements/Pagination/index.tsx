import React from 'react';

import './style.css';

interface Props {
  handler: (pageIndex: number) => void;
  pagesTotal: number;
  activePage: number;
  layout?: 'top' | 'bottom';
}

const Pagination = (props: Props) => {
  const { pagesTotal, activePage, handler, layout = 'top' } = props;
  const pages = [];
  for (let i = 1; i <= pagesTotal; i++) {
    if (activePage === i)
      pages.push(<span onClick={() => handler(i)} key={i} className="pagination__page active">{i.toFixed(0)}</span>);
    else if (activePage - i === 3 || i - activePage === 3)
      pages.push(<span onClick={() => handler(i)} key={i} className="pagination__page empty">...</span>);
    else if (activePage - i >= -2 && activePage - i <= 2)
      pages.push(<span onClick={() => handler(i)} key={i} className="pagination__page">{i.toFixed(0)}</span>);
  }

  const justifyContent = activePage < pagesTotal / 2
    ? 'flex-start'
    : 'flex-end';

  return (
    <div className={`pagination pagination-${layout}`}>
      <span 
        onClick={() => handler(1)} 
        className="pagination__first">
      </span>
      <span 
        onClick={() => activePage - 1 > 0 && handler(activePage -1) } 
        className="pagination__prev">
      </span>
      <span className={`pagination__pages ${pagesTotal <= 3 ? 'pagination__pages-' + pagesTotal : ''}`} style={{ justifyContent }}>
        {pages}
      </span>
      <span 
        onClick={() => activePage + 1 <= pagesTotal && handler(activePage + 1)} 
        className="pagination__next">
      </span>
      <span 
        onClick={() => handler(pagesTotal)} 
        className="pagination__last">
      </span>
    </div>
  );
}
 
export default Pagination;