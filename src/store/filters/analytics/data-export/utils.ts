// import { IFiltersPagination } from "~/interfaces/filters";

// export interface StateWithPagination {
//   pagination: {
//     perPage: number;
//     activePage: number;
//   }
// }

// interface Action {
//   type: string;
//   payload: any;
// }

// export const _rowsPerPageSet = (state: IFiltersPagination, action: Action) => {
//   const perPage = action.payload;
//   if (perPage === undefined) return;
//   state.pagination.perPage = perPage;
// }

// export const _activePageSet = (state: IFiltersPagination, action: Action) => {
//   const page = action.payload;
//   if (page === undefined) return;
//   state.pagination.activePage = page;
// }