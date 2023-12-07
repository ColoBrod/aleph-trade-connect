import {
  IFiltersBeverages,
  IFiltersBusinessUnits,
  IFiltersCoffeeMachineModels,
  IFiltersDateRange,
  IFiltersErrors,
  IFiltersPagination,
  IFiltersOrderBy,
  IFiltersRecipes,
  IFiltersSerialNumbers,
} from "~/interfaces/filters";
import { RootState } from "..";

type FilterKey =
  | "businessUnits"
  | "coffeeMachineModels"
  | "dateRange"
  | "recipes"
  | "serialNumbers"
  | "errors"
  | "beverages"
  | "pagination"
  | "orderBy";

interface Filters {
  "analytics": FilterKey[];
  "analytics/trends": FilterKey[];
  "analytics/dayly-reports": FilterKey[];
  "analytics/data-export": FilterKey[];
  "analytics/data-export/beverages": FilterKey[];
  "analytics/data-export/cleanings": FilterKey[];

  "maintenance": FilterKey[];
  "maintenance/working-hours": FilterKey[];
  "maintenance/monitoring": FilterKey[];
  "maintenance/data-export": FilterKey[];
  "maintenance/data-export/time": FilterKey[];
  "maintenance/data-export/events": FilterKey[];
}

class InitialFilters {
  public static map: Filters = {
    "analytics": ["businessUnits", "coffeeMachineModels"],
    "analytics/trends": ["dateRange", "recipes"],
    "analytics/dayly-reports": ["dateRange", "recipes", "serialNumbers"],
    "analytics/data-export": ["dateRange", "serialNumbers", "recipes"],
    "analytics/data-export/beverages": ["pagination", "orderBy"],
    "analytics/data-export/cleanings": ["pagination", "orderBy"],

    "maintenance": ["businessUnits", "coffeeMachineModels", "errors"],
    "maintenance/working-hours": ["dateRange"],
    "maintenance/monitoring": ["pagination", "orderBy"],
    "maintenance/data-export": [
      "dateRange",
      "serialNumbers",
    ],
    "maintenance/data-export/time": ["pagination", "orderBy"],
    "maintenance/data-export/events": ["pagination", "orderBy"],
  };

  public businessUnits?: IFiltersBusinessUnits["businessUnits"];
  public coffeeMachineModels?: IFiltersCoffeeMachineModels["coffeeMachineModels"];
  public recipes?: IFiltersRecipes["recipes"];
  public dateRange?: IFiltersDateRange["dateRange"];
  public serialNumbers?: IFiltersSerialNumbers["serialNumbers"];
  public beverages?: IFiltersBeverages["beverages"];
  public pagination?: IFiltersPagination["pagination"];
  public orderBy?: IFiltersOrderBy["orderBy"];

  constructor(path: keyof Filters) {
    const filtersKeys = InitialFilters.map[path];
    filtersKeys.forEach((key: FilterKey) => {
      const filter = InitialFilters[key](path);
      Object.assign(this, filter);
    });
  }

  public static getPageFilters(state: RootState, path: string) {
    switch (path) {
      case "/analytics/trends/overview":
      case "/analytics/trends/sales": return Object.assign({},
        state.filters.analytics.common,
        state.filters.analytics.trends
      );
      case "/analytics/dayly-reports": return Object.assign({}, 
        state.filters.analytics.common,
        state.filters.analytics.daylyReports
      );
      case "/analytics/data-export/beverages": return Object.assign({}, 
        state.filters.analytics.common,
        state.filters.analytics.dataExport.shared,
        state.filters.analytics.dataExport.beverages
      );
      case "/analytics/data-export/cleanings": return Object.assign({}, 
        state.filters.analytics.common,
        state.filters.analytics.dataExport.shared,
        state.filters.analytics.dataExport.cleanings
      );
      case "/maintenance/working-hours/overview": return Object.assign({}, 
        state.filters.maintenance.shared,
      );
      case "/maintenance/monitoring": return Object.assign({}, 
        state.filters.maintenance.shared,
        state.filters.maintenance.monitoring
      );
      case "/maintenance/data-export/time": return Object.assign({}, 
        state.filters.maintenance.shared,
        state.filters.maintenance.dataExport.shared,
        state.filters.maintenance.dataExport.time
      );
      case "/maintenance/data-export/events": return Object.assign({}, 
        state.filters.maintenance.shared,
        state.filters.maintenance.dataExport.shared,
        state.filters.maintenance.dataExport.events
      );
      default: return {};
    }
  }

  public static formatFilters(original: any) {
    const filters: any = {};
    
    if ('serialNumbers' in original) 
      filters.serialNumbers = original.serialNumbers.list;

    if ('pagination' in original)
      filters.pagination = original.pagination;

    if ('orderBy' in original) filters.orderBy = original.orderBy;

    return filters;
  }

  private static businessUnits(path: keyof Filters): IFiltersBusinessUnits {
    return {
      businessUnits: {
        checked: ["1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026", "1027", "1028", "1029", "1030", "1031", "1032", "1033", "1034", "1035", "1036", "1037", "1038", "1039", "1040", "1041", "1042", "1043", "1044", "1045", "1046", "1047", "1048", "1049", "1050", "1051", "1052", "1053", "1054", "1055"],
        expanded: [],
        filteredNodes: [],
        filterText: "",
      },
    };
  }

  private static coffeeMachineModels(
    path: keyof Filters
  ): IFiltersCoffeeMachineModels {
    return {
      coffeeMachineModels: {
        substring: "",
        list: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    };
  }

  private static dateRange(path: keyof Filters): IFiltersDateRange {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 62);
    const dateTo = new Date();
    const dateFromFmt = dateFrom.toLocaleDateString("en-US");
    const dateToFmt = dateTo.toLocaleDateString("en-US");
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
      },
    };
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
      },
    };
  }

  private static errors(path: keyof Filters): IFiltersErrors {
    return {
      errors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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

  private static orderBy(path: keyof Filters): IFiltersOrderBy {
    const column = path === 'maintenance/monitoring' ? 'datetime' : "";
    return {
      orderBy: {
        column,
        order: "asc",
      },
    };
  }
}

export default InitialFilters;
