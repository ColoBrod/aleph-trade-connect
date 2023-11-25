import { IFiltersBeverages, IFiltersBusinessUnits, IFiltersCoffeeMachineModels, IFiltersDateRange, IFiltersErrors, IFiltersPagination, IFiltersRecipes, IFiltersSerialNumbers } from "~/interfaces/filters";

type FilterKey = 
  "businessUnits" | 
  "coffeeMachineModels" | 
  "dateRange" | 
  "recipes" |
  "serialNumbers" |
  "errors" |
  "beverages" |
  "pagination";

interface Filters {
  'analytics': FilterKey[];
  'analytics/trends': FilterKey[];
  'analytics/dayly-reports': FilterKey[];
  'analytics/data-export': FilterKey[];
  'analytics/data-export/beverages': FilterKey[];
  'analytics/data-export/cleanings': FilterKey[];
}

class InitialFilters {
  private static map: Filters = {
    'analytics': [ 'businessUnits', 'coffeeMachineModels' ],
    'analytics/trends': [ 'dateRange', 'recipes' ],
    'analytics/dayly-reports': [ 'dateRange', 'recipes', 'serialNumbers' ],
    'analytics/data-export': [ 'dateRange', 'serialNumbers', 'recipes' ],
    'analytics/data-export/beverages': ['pagination'],
    'analytics/data-export/cleanings': ['pagination'],
  }

  public businessUnits?: IFiltersBusinessUnits['businessUnits'];
  public coffeeMachineModels?: IFiltersCoffeeMachineModels['coffeeMachineModels'];
  public recipes?: IFiltersRecipes['recipes'];
  public dateRange?: IFiltersDateRange['dateRange'];
  public serialNumbers?: IFiltersSerialNumbers['serialNumbers'];
  public beverages?: IFiltersBeverages['beverages'];

  constructor(path: keyof Filters) {
    const filtersKeys = InitialFilters.map[path];
    filtersKeys.forEach((key: FilterKey) => {
      const filter = InitialFilters[key](path);
      Object.assign(this, filter);
    })
  }

  private static businessUnits(path: keyof Filters): IFiltersBusinessUnits {
    return {
      businessUnits: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013],
    };
  }

  private static coffeeMachineModels(path: keyof Filters): IFiltersCoffeeMachineModels {
    return {
      coffeeMachineModels: {
        substring: "",
        list: [
          1, 2, 3, 4, 5, 6, 7, 8
          // 1 - 8
          // { checked: true, id: 'coffee-machine-1', name: 'WMF 1500S+' },
          // { checked: true, id: 'coffee-machine-2', name: 'WMF 5000' },
          // { checked: true, id: 'coffee-machine-3', name: 'WMF 6000' },
          // { checked: true, id: 'coffee-machine-4', name: 'WMF 7000' },
          // { checked: true, id: 'coffee-machine-5', name: 'WMF 8000' },
          // { checked: true, id: 'coffee-machine-6', name: 'WMF 9000' },
          // { checked: true, id: 'coffee-machine-7', name: 'WMF 9000' },
        ],
      },
    };
  }

  private static dateRange(path: keyof Filters): IFiltersDateRange {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 1);
    const dateTo = new Date();
    const dateFromFmt = dateFrom.toLocaleDateString();
    const dateToFmt = dateTo.toLocaleDateString();
    return {
      dateRange: {
        date: {
          start: dateFromFmt,
          end: dateToFmt,
        },
        time: {
          start: "00:00",
          end: "23:00",
        },
      }
    }
  }

  private static recipes(path: keyof Filters): IFiltersRecipes {
    return {
      recipes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    };
  }

  private static serialNumbers(path: keyof Filters): IFiltersSerialNumbers {
    return {
      serialNumbers: {
        substring: "",
        list: [],
      }
    };
  }
  
  private static errors(path: keyof Filters): IFiltersErrors {
    return {
      errors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  }

  private static beverages(path: keyof Filters): IFiltersBeverages {
    return {
      beverages: [],
    };
  }

  private static pagination(path: keyof Filters): IFiltersPagination {
    return {
      pagination: {
        perPage: 10,
        activePage: 1,
      },
    };
  }

}

export default InitialFilters;