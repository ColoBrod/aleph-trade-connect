import { createSlice } from "@reduxjs/toolkit"

interface Filters {
  businessUnits: number[]; // Массив с ID бизнес-юнитов
  
  coffeeMachineModels: number[]; // Массив с ID кофе-машин
  
  dateRange: {
    start: Date;  // Дата начала в виде строки, например - "17.12.2023"
    end: Date;    // Дата конца в виде строки, например - "19.12.2023"
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


const initialState: Filters = {
  businessUnits: [],
  coffeeMachineModels: [],
  dateRange: {
    start: new Date(),
    end: new Date(),
  },
  timeRange: {
    start: "00:00",
    end: "23:00",
  },
  recipes: [],
  serialNumberSubstrings: [],
  errors: [],
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    dateRangeSet: (state, action) => {
      const { start, end } = action.payload;
      if (start) state.dateRange.start = start;
      if (end) state.dateRange.end = end;
    },
  }
});

export const { dateRangeSet } = slice.actions;
export default slice.reducer;