import React from 'react';
import './style.css';

import Button from '~/components/ui/Button';
import { IError } from '~/interfaces/entities';

interface Props {
  onClick: (id: number) => void;
  filters: number[];
  errors: IError[];
}

const ErrorsFilter = ({ errors, filters, onClick: handleClick }: Props) => {
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
    </div>
  );
}
 
export default ErrorsFilter;