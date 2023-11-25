import React from 'react';

import Checkbox from '~/components/ui/Checkbox';
import { useAppDispatch, useAppSelector } from '~/hooks';

import './style.css'
// import { coffeeMachineModelSelected } from '~/store/filters/analytics';
import { IFiltersCoffeeMachineModels } from '~/interfaces/filters';

interface Props {
  checked: IFiltersCoffeeMachineModels['coffeeMachineModels']['list'];
  reducer: Function;
}

const CoffeeMachineFilter = ({ checked, reducer: coffeeMachineModelSelected }: Props) => {
  const dispatch = useAppDispatch();
  const { coffeeMachineModels: models } = useAppSelector(state => state.entities.data);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget === null || e.currentTarget.parentNode === null) return;
    const input = e.currentTarget.parentNode.querySelector("input");
    if (!input) return;
    const value = input.checked;
    if (checked.length > 0) dispatch(coffeeMachineModelSelected(checked));
    else {
      const ids = models.map(model => model.id);
      dispatch(coffeeMachineModelSelected(ids));
    }
    input.checked = value === true ? false : true;
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget === null || e.currentTarget.parentNode === null) return;
    const input = e.currentTarget.parentNode.querySelector("input");
    if (!input) return;
    const id = input.id;
    dispatch(coffeeMachineModelSelected(parseInt(id)));
  }

  const allChecked = models.every(m => checked.indexOf(m.id) !== -1)
    ? 1
    : checked.length > 0
      ? 2
      : 0

  return (
    <div className="coffee-machine-filter">
      <Checkbox checked={allChecked} onChange={handleSelectAll} id='select-all' label='Выбрать все' />
      {
        models.map(model => <Checkbox 
          key={model.id} 
          checked={checked.indexOf(model.id) !== -1} 
          id={model.id} 
          onChange={handleCheck}
          label={model.name} />
        )
      }
    </div>
  );
}
 
export default CoffeeMachineFilter;