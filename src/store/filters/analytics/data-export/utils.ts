export interface StateWithPagination {
  pagination: {
    perPage: number;
    activePage: number;
  }
}

interface Action {
  type: string;
  payload: any;
}

export const _rowsPerPageSet = (state: StateWithPagination, action: Action) => {
  const perPage = action.payload;
  if (perPage === undefined) return;
  state.pagination.perPage = perPage;
}

export const _activePageSet = (state: StateWithPagination, action: Action) => {
  const page = action.payload;
  if (page === undefined) return;
  state.pagination.activePage = page;
}