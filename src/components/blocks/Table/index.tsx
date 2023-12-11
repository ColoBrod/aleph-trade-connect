import React from 'react';

import './style.css';
import { error } from '~/services/errors';

import { IFiltersOrderBy } from '~/interfaces/filters';
import { useAppDispatch } from '~/hooks';

interface TableProps {
  keys: string[];
  data: any[][];
  orderBy?: {
    column: string;
    order: "asc" | "desc";
  };
  handleSort?: Function;
}

const Table = (props: TableProps) => {
  const { data, keys, orderBy = { column: "", order: "" }, handleSort: handler } = props;
  if (keys.length !== data[0].length)
    throw new Error("Количество заголовков и ключей не совпадает");

  const headers = data[0];
  const dispatch = useAppDispatch();

  const handleSort = (i: number) => {
    const key = keys[i];
    // @ts-ignore
    handler(key);
    // dispatch(sortAction(key));
    // Do something with this key.
  }

  return (
    <table className='table table-two-dimensional'>
      <thead>
        <tr>
          {headers.map((th, i) => {
            
            const order = keys[i] === orderBy.column 
              ? orderBy.order 
              : ""

            return (<th key={i} className={order} onClick={() => handleSort(i)}>{th}</th>)

          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          if (i === 0) return null;

          return (
            <tr key={i} className='table__column'>
              {
                row.map((td, k, row) => {
                  const field = keys[k];
                  // field === 'errorDesc'
                  // field === 'errorDesc' ||
                  const errClass = field === 'errorCode'
                    ? "err-" + error[row[k]]
                    : "";
                  const innerHTML = field !== 'errorCode'
                    ? td
                    : <span className={`err-badge ${errClass}`}>{td}</span>
                  return (<td key={k} className={`table__cell table__cell-${field} ${errClass }`}>{innerHTML}</td>)
                })
              }
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// function getErrClass(code: string) {
//   // "event", "info", "maintenance", "error", "tech-info"
//   const errors = {
//     "0": "info",
//   }
// }
 
export default Table;