export interface Filters {
  businessUnits: number[]; // Массив с ID бизнес-юнитов
  
  coffeeMachineSubstring: string;
  coffeeMachineModels: {
    selectAll: boolean;
    list: {
      checked: boolean;
      id: string;
      name: string;
    }[];
  }; // Массив с ID кофе-машин
  
  dateRange: {
    start?: Date;  // Дата начала в виде строки, например - "17.12.2023"
    end?: Date;    // Дата конца в виде строки, например - "19.12.2023"
  };

  timeRange: {
    start: string;  // Время начала в виде строки, например "09:00"
    end: string;    // Время окончания в виде строки, например "21:00"
  };

  recipes: number[]; // Массив с ID рецептов.

  // Серийные номера кофе-машин. Поиск по подстроке или по регулярному выражению
  // может совпадать частично с фактическим номером кофе-машины
  serialNumberSubstrings: string[]; 

  errors: number[]; // ID ошибок кофе-машин
}
