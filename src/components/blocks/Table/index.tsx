import React from 'react';

import './style.css';

interface TableProps {
  data: any[][];
}

const Table = (props: TableProps) => {
  const { data } = props;
  const headers = data[0];

  return (
    <table className='table-two-dimensional'>
      <thead>
        <tr>
          {headers.map((th, i) => (
            <th key={i}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          if (i === 0) return null;
          return (
            <tr key={i}>
              {row.map((td, k) => (
                <td key={k}>{td}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
 
export default Table;