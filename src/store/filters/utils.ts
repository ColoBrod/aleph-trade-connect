import { IFiltersCoffeeMachineModels, IFiltersDateRange, IFiltersRecipes } from "~/interfaces/filters";

export const _coffeeMachineModelSelected = (
  state: IFiltersCoffeeMachineModels, 
  action: { type: string; payload: number | number[] }
) => {
  const models = state.coffeeMachineModels.list;
  const toggle = (id: number) => {
    const modelIndex = models.indexOf(id);
    if (modelIndex === -1) models.push(id);
    else models.splice(modelIndex, 1);
  }
  if (Array.isArray(action.payload)) {
    const ids = action.payload;
    ids.forEach(toggle)
  }
  else if (typeof action.payload === 'number') {
    const id = action.payload;
    toggle(id);
  }
}

export const _recipeToggled = (
  state: IFiltersRecipes, 
  action: { type: string; payload: number }
) => {
  const { recipes } = state;
  const id = action.payload;
  const recipeIndex = recipes.indexOf(id);
  if (recipeIndex === -1) recipes.push(id);
  else recipes.splice(recipeIndex, 1);
}

export const _dateRangeSet = (
  state: IFiltersDateRange,
  action: { 
    type: string;
    payload: { start?: string; end?: string; };
  }
) => {
  const { start, end } = action.payload;
  if (start) state.dateRange.date.start = start;
  if (end) state.dateRange.date.end = end;
}