import React from 'react';

import './style.css';

interface Props {
  handler: (pageIndex: number) => void;
  pagesTotal: number;
  activePage: number;
}

const Pagination = (props: Props) => {
  const { pagesTotal, activePage, handler } = props;
  const pages = [];
  for (let i = 1; i <= pagesTotal; i++) {
    if (activePage === i)
      pages.push(<span onClick={() => handler(i)} key={i} className="pagination__page active">{i.toFixed(0)}</span>);
    else if (activePage - i === 3 || i - activePage === 3)
      pages.push(<span onClick={() => handler(i)} key={i} className="pagination__page empty">...</span>);
    else if (activePage - i >= -2 && activePage - i <= 2)
      pages.push(<span onClick={() => handler(i)} key={i} className="pagination__page">{i.toFixed(0)}</span>);
  }

  return (
    <div className="pagination">
      <span onClick={() => handler(1)} className="pagination__first"></span>
      <span onClick={() => handler(activePage -1)} className="pagination__prev"></span>
      {pages}
      <span onClick={() => handler(activePage + 1)} className="pagination__next"></span>
      <span onClick={() => handler(pagesTotal)} className="pagination__last"></span>
    </div>
  );
}
 
export default Pagination;