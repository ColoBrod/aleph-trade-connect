import { Node as TreeNode } from 'react-checkbox-tree';
import { ErrorType } from '~/services/errors';


/**
 * Время передается строкой типа "00:00", "23:00"...
 */
export interface IFiltersTimeRange {
  start: string;
  end: string;
}

/**
 * Дата опционально может включать в себя время. В таком случае дополнительно
 * передаем свойство time. 
 */
export interface IFiltersDateRange {
  dateRange: {
    date: {
      start: string;
      end: string;
    };
    time: IFiltersTimeRange;
  };
}

export interface IFiltersBusinessUnits {
  businessUnits: {
    checked: string[];
    expanded: string[];
    filterText: string;
    filteredNodes: TreeNode[];
  };
}

export interface IFiltersRecipes {
  recipes: number[];
}

export interface IFiltersErrors {
  errors: number[];
}

export interface IFiltersCoffeeMachineModels {
  coffeeMachineModels: {
    substring: string;
    list: number[];
    // list: {
    //   id: string;
    //   name: string;
    //   checked: boolean;
    // }[];
  };
}

export interface IFiltersSerialNumbers {
  serialNumbers: {
    substring: string;
    list: string[];
  };
}

export interface IFiltersBeverages {
  beverages: number[];
}

export interface IFiltersPagination {
  pagination: {
    perPage: number;
    activePage: number;
  };
}

export interface IFiltersOrderBy {
  orderBy: {
    column: string;
    order: 'asc' | 'desc';
  }
}

export interface IFiltersEvents {
  events: ErrorType[];
}

export interface IFilters_Analytics
  extends 
    IFiltersBusinessUnits,
    IFiltersCoffeeMachineModels {}

// export interface IFilters_Analytics {
//   businessUnits: number[];
//   recipes: number[];
//   coffeeMachineModels: {
    
//   };
//   dateRange: IFiltersDateRange;
//   // recipes: number[];
// }

export interface IFilters_Analytics_Trends
  extends 
    IFiltersCoffeeMachineModels,
    IFiltersRecipes, 
    IFiltersDateRange {}

export interface IFilters_Analytics_DaylyReports
  extends 
    IFiltersDateRange,
    IFiltersSerialNumbers,
    IFiltersBeverages,
    IFiltersBusinessUnits {}

export interface IFilters_Analytics_DataExport 
  extends 
    IFiltersSerialNumbers,
    IFiltersDateRange,
    IFiltersRecipes {}

export interface IFilters_Analytics_DataExport_Beverages
  extends 
    IFiltersPagination,
    IFiltersOrderBy {}

export interface IFilters_Analytics_DataExport_Cleanings
  extends 
    IFiltersPagination,
    IFiltersOrderBy {}

export interface IFilters_Maintenance
  extends
    IFiltersBusinessUnits,
    IFiltersCoffeeMachineModels,
    IFiltersErrors {}

export interface IFilters_Maintenance_WorkingHours
  extends
    IFiltersDateRange {}

export interface IFilters_Maintenance_Monitoring
  extends
    IFiltersBusinessUnits,
    IFiltersPagination,
    IFiltersOrderBy, 
    IFiltersEvents {}

export interface IFilters_Maintenance_DataExport
  extends
    IFiltersDateRange,
    IFiltersSerialNumbers {}

export interface IFilters_Maintenance_DataExport_Time
  extends
    IFiltersPagination,
    IFiltersOrderBy {}

export interface IFilters_Maintenance_DataExport_Events
  extends
    IFiltersPagination,
    IFiltersOrderBy {}

// export const initialFilters_Analytics: IFilters_Analytics = {
//   businessUnits: [],
//   recipes: [],
//   coffeeMachineModels: {
//     substring: "",
//     selectAll: true, // 0, 1, 2
//     list: [],
//   },
//   dateRange: {
//     date: {
//       start: "11/21/2023",
//       end: "11/22/2023",
//     },
//     time: {
//       start: "00:00",
//       end: "08:00",
//     },
//   },
// }