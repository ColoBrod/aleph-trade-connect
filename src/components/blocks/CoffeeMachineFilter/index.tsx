import React from 'react';

import Checkbox from '~/components/ui/Checkbox';
import { useAppDispatch, useAppSelector } from '~/hooks';

import './style.css'
import { coffeeMachineModelsAllSelected, coffeeMachineModelSelected } from '~/store/filters/analytics';

const CoffeeMachineFilter = () => {
  const dispatch = useAppDispatch();
  const { selectAll } = useAppSelector(state => state.filters.analytics.common.coffeeMachineModels);
  const models = useAppSelector(state => state.filters.analytics.common.coffeeMachineModels.list);

  // console.log("Models:", models);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget === null || e.currentTarget.parentNode === null) return;
    const input = e.currentTarget.parentNode.querySelector("input");
    if (!input) return;
    const value = input.checked;
    dispatch(coffeeMachineModelsAllSelected({ value }));
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget === null || e.currentTarget.parentNode === null) return;
    const input = e.currentTarget.parentNode.querySelector("input");
    if (!input) return;
    const id = input.id;
    const checked = input.checked;
    dispatch(coffeeMachineModelSelected({ id, checked }));
  }

  return (
    <div className="coffee-machine-filter">
      <Checkbox checked={selectAll} onChange={handleSelectAll} id='select-all' label='Выбрать все' />
      {
        models.map(model => <Checkbox 
          key={model.id} 
          checked={model.checked} 
          id={model.id} 
          onChange={handleCheck}
          label={model.name} />
        )
      }
    </div>
  );
}
 
export default CoffeeMachineFilter;