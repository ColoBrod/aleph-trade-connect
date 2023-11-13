import React from 'react';

import Checkbox from '~/components/ui/Checkbox';
import { useAppDispatch, useAppSelector } from '~/hooks';

import './style.css'
import { coffeeMachineModelsAllSelected } from '~/store/filters';

const CoffeeMachineFilter = () => {
  const dispatch = useAppDispatch();
  const { selectAll } = useAppSelector(state => state.filters.coffeeMachineModels);
  const models = useAppSelector(state => state.filters.coffeeMachineModels.list);

  const handleSelectAll = (e: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
    // @ts-ignore
    // const { value } = e.currentTarget;
    const input = e.currentTarget.parentNode.querySelector("input");
    if (!input) return;
    const value = input?.value;
    dispatch(coffeeMachineModelsAllSelected({ value }));
  }

  return (
    <div className="coffee-machine-filter">
      <Checkbox checked={selectAll} onClick={handleSelectAll} id='select-all' label='Выбрать все' />
      {
        models.map(model => <Checkbox checked={model.checked} id={model.id} label={model.name} />)
      }
      {/* <Checkbox checked={true} id='coffee-machine-1' label='WMF 1500S+' />
      <Checkbox checked={true} id='coffee-machine-2' label='WMF 5000' />
      <Checkbox checked={false} id='coffee-machine-3' label='WMF 9000' />
      <Checkbox checked={false} id='coffee-machine-4' label='WMF 9000' />
      <Checkbox checked={false} id='coffee-machine-5' label='WMF 9000' />
      <Checkbox checked={false} id='coffee-machine-6' label='WMF 9000' />
      <Checkbox checked={false} id='coffee-machine-7' label='WMF 9000' /> */}
    </div>
  );
}
 
export default CoffeeMachineFilter;