/**
 * Время передается строкой типа "00:00", "23:00"...
 */
export interface ITimeRange {
  start: string;
  end: string;
}

/**
 * Дата опционально может включать в себя время. В таком случае дополнительно
 * передаем свойство time. 
 */
export interface IDateRange {
  date: {
    start: string;
    end: string;
  };
  time?: ITimeRange;
}

export interface IFilters_Analytics {
  businessUnits: number[];
  coffeeMachineModels: {
    substring: string;
    selectAll: boolean;
    list: {
      id: string;
      name: string;
      checked: boolean;
    }[]
  };
  dateRange: IDateRange;
  recipes: number[];
}

export interface IFilters_Analytics_Trends extends IFilters_Analytics {
  
}

export interface IFilters_Analytics_DaylyReports {
  dateRange: IDateRange;
  // timeRange: ITimeRange;
  serialNumbers: {
    substring: string;
    list: string[];
  };
  beverages: number[];
}

export interface IFilters_Analytics_DataExport extends IFilters_Analytics {
  serialNumbers: string[];
}