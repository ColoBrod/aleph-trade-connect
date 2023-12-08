import React, { MouseEventHandler } from 'react';
import './style.css';

import Button from '~/components/ui/Button';
import { IError } from '~/interfaces/entities';

interface Props {
  onClick: (id: number) => void;
  handleSelectAll?: MouseEventHandler<HTMLSpanElement>;
  handleUnselectAll?: MouseEventHandler<HTMLSpanElement>;
  filters: number[];
  errors: IError[];
}

const ErrorsFilter = ({ errors, filters, onClick: handleClick, handleSelectAll, handleUnselectAll }: Props) => {
  return (
    <div className="errors-filter">
      {
        errors.map(error => {
          const { id, code, name } = error;
          const active: boolean = filters.indexOf(error.id) !== -1;
          return (
            <Button 
              key={error.id}
              layout={active ? "dark" : "light"}
              onClick={() => {
                handleClick(error.id)
              }}
              >
                {error.name}
            </Button>)
        })
      }    
      <div className="errors-filter__controls">
        <span onClick={handleUnselectAll} className="errors-filter__clear">Очистить</span>
        <span onClick={handleSelectAll} className="errors-filter__select-all">Добавить все</span>
      </div>
    </div>
  );
}
 
export default ErrorsFilter;