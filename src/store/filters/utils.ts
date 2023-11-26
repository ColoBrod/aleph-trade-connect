import { IFiltersBusinessUnits, IFiltersCoffeeMachineModels, IFiltersDateRange, IFiltersRecipes, IFiltersSerialNumbers } from "~/interfaces/filters";

export const _businessUnitsSet = (
  state: IFiltersBusinessUnits,
  action: { type: string; payload: string[]; },
) => {
  state.businessUnits.checked = action.payload;
}

export const _businessUnitsExpanded = (
  state: IFiltersBusinessUnits,
  action: { type: string; payload: string[]; },
) => {
  // console.log(action.payload);
  state.businessUnits.expanded = action.payload;
}
export const _businessUnitsFilterChanged = (
  state: IFiltersBusinessUnits,
  action: { type: string; payload: string; },
) => {
  state.businessUnits.filterText = action.payload;
}

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

/** Судя по всему у нас не будет поиска по кофе-машинам */
export const _coffeeMachineModelSearched = (
  state: IFiltersCoffeeMachineModels,
  action: { type: string; payload: { substring: string }; }
) => {
  const { substring } = action.payload;
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

export const _timeRangeSet = (
  state: IFiltersDateRange,
  action: {
    type: string;
    payload: { start?: string; end?: string; }
  }
) => {
  const { start, end } = action.payload;
  if (state.dateRange.time === undefined) return;
  if (start) state.dateRange.time.start = start;
  if (end) state.dateRange.time.end = end;
}

export const _serialNumberAdded = (
  state: IFiltersSerialNumbers,
  action: { type: string; payload: { substring: string } }
) => {
  const { substring } = action.payload;
  const { list } = state.serialNumbers;
  if (!substring || list.indexOf(substring) !== -1) return;
  list.push(substring);
}

export const _serialNumberRemoved = (
  state: IFiltersSerialNumbers,
  action: { type: string; payload: { substring: string } }
) => {
  const { substring } = action.payload;
  const { list } = state.serialNumbers;
  const index = list.indexOf(substring);
  list.splice(index, 1);
}