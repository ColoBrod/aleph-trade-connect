import { 
  IFiltersBusinessUnits, 
  IFiltersCoffeeMachineModels, 
  IFiltersDateRange, 
  IFiltersRecipes, 
  IFiltersSerialNumbers,
  IFiltersPagination,
  IFiltersErrors,
  IFiltersOrderBy,
  IFiltersEvents,
} from "~/interfaces/filters";
import { ErrorType } from "~/services/errors";

export const _businessUnitsSet = (
  state: IFiltersBusinessUnits,
  action: { type: string; payload: string[]; },
) => {
  const businessUnits = action.payload
  state.businessUnits.checked = businessUnits;
}

export const _businessUnitsSelectedAll = (
  state: IFiltersBusinessUnits,
  action: { type: string; payload: string[] }
) => {
  const { checked } = state.businessUnits;  
  console.log("Payload:", action.payload);
  if (checked.length === 0) state.businessUnits.checked = action.payload;
  else state.businessUnits.checked = [];
  // if (checked.length === 0) state.businessUnits.checked = action.payload;
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

export const _recipesUnselected = (
  state: IFiltersRecipes
) => {
  const { recipes } = state;
  recipes.length = 0;
}

export const _recipesSelected = (
  state: IFiltersRecipes,
  action: { type: string; payload: number[]; }
) => {
  const ids = action.payload;
  // console.log("STATE:", state);
  // console.log("ids:", ids);
  // console.log("initial:", state.recipes);
  // state.recipes.concat(ids);
  // console.log("final:", state.recipes);
  ids.forEach(id => {
    if (state.recipes.includes(id)) return;
    state.recipes.push(id);
  })
}

export const _errorToggled = (
  state: IFiltersErrors, 
  action: { type: string; payload: string }
) => {
  const { errors } = state;
  const id = action.payload;
  const errorIndex = errors.indexOf(id);
  if (errorIndex === -1) errors.push(id);
  else errors.splice(errorIndex, 1);
}

export const _errorsSelected = (
  state: IFiltersErrors, 
  action: { type: string; payload: string[]; }
) => {
  const ids = action.payload;
  ids.forEach(id => {
    if (state.errors.includes(id)) return;
    state.errors.push(id);
  })
}

export const _errorsUnselected = (
  state: IFiltersErrors
) => {
  const { errors } = state;
  errors.length = 0;
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

export const _serialNumbersRemovedAll = (
  state: IFiltersSerialNumbers,
  action: { type: string; }
) => {
  state.serialNumbers.list.length = 0;
  // const index = list.indexOf(substring);
  // list.splice(index, 1);
}

export const _rowsPerPageSet = (
  state: IFiltersPagination, 
  action: { type: string; payload: any; }
) => {
  const perPage = action.payload;
  if (perPage === undefined) return;
  state.pagination.perPage = perPage;
}

export const _activePageSet = (
  state: IFiltersPagination, 
  action: { type: string; payload: any; }
) => {
  const page = action.payload;
  if (page === undefined) return;
  state.pagination.activePage = page;
}

export const _orderBySet = (
  state: IFiltersOrderBy, 
  action: { type: string; payload: string; }
) => {
  const column = action.payload;
  const { order } = state.orderBy
  if (state.orderBy.column === column) 
    state.orderBy.order = order === 'desc' ? 'asc' : 'desc';
  else Object.assign(state.orderBy, { column, order: 'desc' })

  // if (state.)
  // if (page === undefined) return;
  // state.pagination.activePage = page;
}

export const _eventSet = (
  state: IFiltersEvents,
  action: { type: string; payload: ErrorType | ErrorType[]; }
) => {
  const { payload } = action;
  if (Array.isArray(payload)) {
    const events = payload;
    state.events = events;
  }
  else {
    const event = payload;
    const index = state.events.indexOf(payload);
    if (index === -1) state.events.push(event);
    else state.events.splice(index, 1);
    localStorage.setItem('filters/maintenance/monitoring/events', JSON.stringify(state.events))
  }
}
