import React, { MouseEventHandler } from 'react';
import './style.css';

import Button from '~/components/ui/Button';
import ErrorButton from './ErrorButton';
import { IError } from '~/interfaces/entities';
import { error as errorClasses } from '~/services/errors';

interface Props {
  onClick: (id: string) => void;
  handleSelectAll?: MouseEventHandler<HTMLSpanElement>;
  handleUnselectAll?: MouseEventHandler<HTMLSpanElement>;
  filters: string[];
  errors: IError[];
}

const ErrorsFilter = ({ errors, filters, onClick: handleClick, handleSelectAll, handleUnselectAll }: Props) => {
  return (
    <div className="errors-filter">
      <div className="errors-filter__inner">
        {
          errors.map(error => {
            const { id, code, type, description } = error;
            const errorClass = errorClasses[type] ? errorClasses[type] : "unknown";
            const active: boolean = filters.indexOf(id) !== -1;
            return (
              <ErrorButton 
                active={active}
                errClass={errorClass}
                onClick={() => handleClick(id)}
                >
                {code}
              </ErrorButton>

              // <Button 
              //   key={id}
              //   layout={active ? "dark" : "light"}
              //   onClick={() => {
              //     handleClick(id)
              //   }}
              //   >
              //     {code}
              // </Button>
            )
          })
        }
      </div>
      <div className="errors-filter__controls">
        <span onClick={handleUnselectAll} className="errors-filter__clear">Очистить</span>
        <span onClick={handleSelectAll} className="errors-filter__select-all">Добавить все</span>
      </div>
    </div>
  );
}
 
export default ErrorsFilter;