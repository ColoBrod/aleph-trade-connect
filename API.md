# API docs

Линия тренда
Убрать UTC, добавить колонки в таблицу
Высота фильтров над таблицей  

## Навигация

- [API docs](#API-docs)
  - [Навигация](#Навигация)
  - [Общая информация](#Общая-информация)
  - [Params](#Params)
  - [Routes](#Routes)
    - [`GET /api/entities`](#GET-apientities)
    - [`GET /api/entities/coffee-machines`](#GET-apientitiescoffee-machines)
    - [`GET /api/entities/business-units`](#GET-apientitiesbusiness-units)
    - [`GET /api/entities/recipes`](#GET-apientitiesrecipes)
    - [`GET /api/entities/errors`](#GET-apientitieserrors)
    - [`POST /api/analytics/trends/header`](#POST-apianalyticstrendsheader)
    - [`POST /api/analytics/trends/overview/dispensings-by-date`](#POST-apianalyticstrendsoverviewdispensings-by-date)
    - [`POST /api/analytics/trends/overview/consumptions`](#POST-apianalyticstrendsoverviewconsumptions)
    - [`POST /api/analytics/trends/overview/cleanings`](#POST-apianalyticstrendsoverviewcleanings)
    - [`POST /api/analytics/trends/overview/dispensings-by-hierarchy-level`](#POST-apianalyticstrendsoverviewdispensings-by-hierarchy-level)
    - [`POST /api/analytics/trends/sales/dispensings-by-date`](#POST-apianalyticstrendssalesdispensings-by-date)
    - [`POST /api/analytics/trends/sales/dispensings-by-cup-size`](#POST-apianalyticstrendssalesdispensings-by-cup-size)
    - [`POST /api/analytics/trends/sales/dispensings-by-recipe`](#POST-apianalyticstrendssalesdispensings-by-recipe)
    - [`POST /api/analytics/trends/sales/dispensings-by-weekday-and-time`](#POST-apianalyticstrendssalesdispensings-by-weekday-and-time)
    - [`POST /api/analytics/trends/sales/dispensings-previous-vs-current`](#POST-apianalyticstrendssalesdispensings-previous-vs-current)
    - [`POST /api/analytics/trends/sales/dispensings-by-path`](#POST-apianalyticstrendssalesdispensings-by-path)
    - [`POST /api/analytics/trends/dayly-reports/dispensings-by-restaurant`](#POST-apianalyticstrendsdayly-reportsdispensings-by-restaurant)
    - [`POST /api/analytics/trends/dayly-reports/cleanings-by-restaurant`](#POST-apianalyticstrendsdayly-reportscleanings-by-restaurant)
    - [`POST /api/analytics/trends/dayly-reports/dispensings-by-hour`](#POST-apianalyticstrendsdayly-reportsdispensings-by-hour)
    - [`POST /api/analytics/trends/dayly-reports/dispensings-by-weekday`](#POST-apianalyticstrendsdayly-reportsdispensings-by-weekday)
    - [`POST /api/analytics/trends/dayly-reports/dispensings-by-recipe`](#POST-apianalyticstrendsdayly-reportsdispensings-by-recipe)
    - [`POST /api/analytics/trends/dayly-reports/dispensings-by-cup-size`](#POST-apianalyticstrendsdayly-reportsdispensings-by-cup-size)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-hour`](#POST-apimaintenanceworking-hoursoverviewdowntime-by-hour)
    - [`POST /api/maintenance/working-hours/overview/downtime-causes`](#POST-apimaintenanceworking-hoursoverviewdowntime-causes)
    - [`POST /api/maintenance/working-hours/overview/downtime-errors`](#POST-apimaintenanceworking-hoursoverviewdowntime-errors)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-weekday`](#POST-apimaintenanceworking-hoursoverviewdowntime-by-weekday)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-week`](#POST-apimaintenanceworking-hoursoverviewdowntime-by-week)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-buisness-unit`](#POST-apimaintenanceworking-hoursoverviewdowntime-by-buisness-unit)
  - [Interfaces](#Interfaces)
    - [IByDay](#IByDay)
    - [ICoffeeMachine](#ICoffeeMachine)
    - [IBusinessUnit](#IBusinessUnit)



## Общая информация

Клиент в заголовках всегда передает:

| Headers                        |
| ------------------------------ |
| accept: application/json       |
| Content-Type: application/json |
| Authorization: Bearer code     |

Bearer токен используется для авторизация пользователя. В случае, если 
пользователь не обладает достаточным количеством прав для просмотра какой-то 
страницы возвращаем ошибку 403. Если пользователь не авторизован - 401

## Params

Фильтры передаются в виде теле (body) запроса в формате JSON.
В качестве ID кофе-машин, передаю именно autoincrement id из БД, не alephId?

~~~ts
interface Params {
  filters: {
    
    businessUnits: number[]; // Массив с ID бизнес-юнитов
    
    coffeeMachineModels: number[]; // Массив с ID кофе-машин
    
    dateRange: {
      start: string;  // Дата начала в виде строки, например - "17.12.2023"
      end: string;    // Дата конца в виде строки, например - "19.12.2023"
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
}

~~~

## Routes

  ### `GET /api/entities`

  #### Info:

  **ВАЖНО**: Этот эндпоинт под вопросом. Можно объединить все эндпоинты `/api/entities` в один и запрашивать сразу после авторизации пользователя в системе.

  - [`ICoffeeMachine`](#icoffeemachine)
  - [`IBusinessUnit`](#ibusinessunit)


  #### Request:
  Без дополнительных параметров.

  #### Response:

  ✔ 200

  ~~~ts
  {
    coffeeMachines: ICoffeeMachine[];
    coffeeMachines: IBusinessUnit[];
    recipes: {
      id: number;
      name: string; // Название рецепта
    }[];
    errors: {
      id: number;
      name: string; // Название ошибки
    }[];
  }
  ~~~

  ### `GET /api/entities/coffee-machines`

  #### Info:

  Для SearchBar в шапке и фильтров. 1 раз при загрузке приложения.

  - [`ICoffeeMachine`](#icoffeemachine)

  #### Request:
  Без дополнительных параметров.

  #### Response:

  ✔ 200

  ~~~ts
  {
    coffeeMachines: ICoffeeMachine[];
  }
  ~~~

  ### `GET /api/entities/business-units`

  #### Info:

  Для SearchBar в шапке и фильтров. 1 раз при загрузке приложения.
  - [`IBusinessUnit`](#ibusinessunit)

  #### Request:
  Без дополнительных параметров.

  #### Response:

  ✔ 200

  ~~~ts
  {
    businessUnits: IBusinessUnit[];
  }
  ~~~

  ### `GET /api/entities/recipes`

  #### Info:

  Используется на странице **Аналитика - Трендовая Аналитика - Настройки**

  #### Request:
  Без дополнительных параметров.

  #### Response:

  ✔ 200

  ~~~ts
  {
    recipes: {
      id: number;
      name: string; // Название рецепта
    }[];
  }
  ~~~

  ### `GET /api/entities/errors`

  #### Info:

  Используется на странице **Обслуживание - Время работы - Настройки**

  #### Request:
  Без дополнительных параметров.

  #### Response:

  ✔ 200

  ~~~ts
  {
    errors: {
      id: number;
      name: string; // Название ошибки
    }[];
  }
  ~~~

  ### `POST /api/analytics/trends/header`

  #### Info:

  Используется для содержимого виджетов на всех страницах **Аналитика - Трендовая аналитика**

  #### Request:
  
  JSON в теле (body) запроса: [`Params`](#params)  
  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings

  #### Response:

  ✔ 200

  ~~~ts
  {
    // Все кофе-машинки, которые за выбранный период использовались хотя бы 1 раз.
    workingMachinesCount: number;
    // Всего разлито напитков за выбранный период
    dispensingsTotal: number;
  }
  ~~~

  ### `POST /api/analytics/trends/overview/dispensings-by-date`

  #### Info:

  График **Dispensings by Day** на странице **Аналитика - Трендовая аналитика - Обзор**
  - [`IByDay`](#ibyday)

  #### Request:

  JSON в теле (body) запроса: [`Params`](#params)  
  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings

  #### Response:

  ✔ 200

  ~~~ts
  {
    dispensingsByDay: {
      previousWeek: IByDay;
      currentWeek: IByDay;
    };
  }
  ~~~

  ### `POST /api/analytics/trends/overview/consumptions`

  #### Info:

  График **Consumptions** на странице **Аналитика - Трендовая аналитика - Обзор**

  #### Request:

  JSON в теле (body) запроса: [`Params`](#params)  
  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings

  #### Response:
  ✔ 200
  ~~~ts
  {
    // Расход ингридиентов за выбранный период
    consumptions: {
      water: number;
      milk: number;
      coffee: number;
      chocolate: number;
    }
  }
  ~~~

  ### `POST /api/analytics/trends/overview/cleanings`
  #### Info:
  График **Cleanings** на странице **Аналитика - Трендовая аналитика - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько чисток в среднем проводилось в день.
    cleanings: {
      // На прошлой неделе
      previousWeek: number;
      // На текущей неделе
      currentWeek: number;
    }
  }
  ~~~
  

  ### `POST /api/analytics/trends/overview/dispensings-by-hierarchy-level`
  #### Info:
  График **Dispensings by Hierarchy Level** на странице **Аналитика - Трендовая аналитика - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько в среднем было выдач на одну кофе машину по бизнес-юнитам
    // Бизнес-юниты берутся самого высокого ранга но в неединственном числе
    dispensingsPerMachineAverage: { 
      name: string; // Название бизнес-юнита, например - Москва или ЦФО
      value: number; // Среднее количество разливов на одну машинку в этом бизнес-юните
    }[]
  }
  ~~~
  

  ### `POST /api/analytics/trends/sales/dispensings-by-date`
  #### Info:
  График **Dispensings by Date** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было всего приготовлено напитков в каждую отдельно взятую дату.
    dispensingsByDate: { 
      date: string; // Дата в виде строки, например - "17.12.2023"
      dispensings: number; // Среднее количество разливов на одну машинку в этом бизнес-юните
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-cup-size`
  #### Info:
  График **Dispensings by Cup Size** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было разлито напитков конкретного размера за выбранный период
    dispensingsByCupSize: { 
      cupSize: "S" | "M" | "L"; // Размер чашки
      dispensings: number; // Всего напитков разлито этого размера
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-recipe`
  #### Info:
  График **Dispensings by Recipe** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было разлито напитков каждого рецепта
    dispensingsByRecipe: { 
      recipe: string; // Название рецепта, например - "Американо 200мл"
      dispensings: number; // Всего напитков этого рецепта
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-weekday-and-time`
  #### Info:
  График **Dispensings by Weekday and Time** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько было разлито напитков в каждый отдельный день недели по часам за
    // выбранный период 
    dispensings: { 
      // Каждый день недели в виде массива длиной в 24 числа.
      // По индексу 0 - напитки выданный в период с 0:00 - 0:59:59
      // По индексу 1 - напитки выданный в период с 1:00 - 1:59:59
      // ...
      // По индексу 23 - напитки выданный в период с 23:00 - 23:59:59
      mon: number[]; 
      tue: number[]; 
      wed: number[]; 
      thu: number[]; 
      fri: number[]; 
      sat: number[]; 
      sun: number[]; 
    }
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-previous-vs-current`
  #### Info:
  График **Неделя к неделе** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько напитков было всего разлито на текущей и на предыдущей неделе
    dispensingsByWeek: { 
      previous: number; // Всего напитков на прошлой неделе
      current: number; // Всего напитков на текущей неделе
    }
  }
  ~~~

  ### `POST /api/analytics/trends/sales/dispensings-by-path`
  #### Info:
  График **Напитки по бизнес-юнитам** на странице **Аналитика - Трендовая аналитика - Продажи**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько напитков было всего разлито за выбранной период в каждом 
    // отдельном бизнес-юните.
    // Бизнес-юниты берутся самого высокого ранга но в неединственном числе
    dispensingsByPath: { 
      name: string; // Название бизнес-юнита, например "Москва" или "ЦФО"
      dispensings: number; // Всего напитков разлито в этом юните.
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/dayly-reports/dispensings-by-restaurant`
  #### Info:
  График **Напитки по ресторанам** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько напитков было разлито в каждом отдельно взятом ресторане за 
    // выбранный период
    dispensingsByRestaurant: { 
      name: string; // Название ресторана, например "Бургер-РУС 3276"
      dispensings: number; // Всего напитков разлито в этом ресторане.
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/dayly-reports/cleanings-by-restaurant`
  #### Info:
  График **Соблюдение правил чистки ресторанами** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Сколько в среднем 
    cleaningsByRestaurant: { 
      name: string; // Название ресторана, например "Бургер-РУС 3276"
      cleanings: number; // Всего напитков разлито в этом ресторане.
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/dayly-reports/dispensings-by-hour`
  #### Info:
  График **Напитки по часам** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Массив с напитками
    dispensingsByHour: { 
      hour: string; // Час в виде 2-значной строки 00-23, например "07" или "21"
      dispensings: number; // Сколько напитков было отдано в этот час.
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/dayly-reports/dispensings-by-weekday`
  #### Info:
  График **Напитки по дням** на странице **Аналитика - Ежедневные отчеты**
  - [`IByDay`](#ibyday)  
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // День недели - число
    dispensingsByWeekday: IByDay;
  }
  ~~~

  ### `POST /api/analytics/trends/dayly-reports/dispensings-by-recipe`
  #### Info:
  График **Напитки по рецептам** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // День недели - число
    dispensingsByRecipe: {
      recipe: string; // Название рецепта
      dispensings: number; // Всего разливов      
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/dayly-reports/dispensings-by-cup-size`
  #### Info:
  График **Напитки по размеру чашки** на странице **Аналитика - Ежедневные отчеты**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  #### Response:
  ✔ 200
  ~~~ts
  {
    // День недели - число
    dispensingsByCupSize: {
      // Тут нужно решить, либо cupSize - это название, либо ID
      cupSize: "S" | "M" | "L";
      dispensings: number; // Всего разливов      
    }[]
  }
  ~~~

  ### `POST /api/analytics/trends/data-export/dispensings`
  #### Info:
  Таблица на странице **Аналитика - Экспорт данных - Напитки**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  - [`IBusinessUnit`](#ibusinessunit)
  #### Response:
  ✔ 200
  ~~~ts
  {
    content: {
      {
        businessUnit: string | IBusinessUnit;
        coffeeMachineModel: 
      }
    }[]
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-hour`
  #### Info:
  График **Простои к/м по часам** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    // Ошибки на прошлой и текущей неделе по часам.
    downtimeByHour: {
      // По индексу 0 - ошибки в период с 0:00 - 0:59:59
      // По индексу 1 - ошибки в период с 1:00 - 1:59:59
      // ...
      // По индексу 23 - ошибки в период с 23:00 - 23:59:59
      previousWeek: number[];
      currentWeek: number[];
    }
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-causes`
  #### Info:
  График **Причины простоев** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeCauses: {
      cause: string; // Причина простоя
      time: number; // Время простоя в секундах
    }[];
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-errors`
  #### Info:
  График **Наиболее популярные ошибки** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeErrors: {
      cause: string; // Название ошибки
      time: number; // Время простоя в секундах
    }[];
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-weekday`
  #### Info:
  График **Простои к/м по дням** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeByWeekday: {
      Mon: number; // Время простоя в секундах
      Tue: number;
      Wed: number;
      Thu: number;
      Fri: number;
      Sat: number;
      Sun: number;
    };
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-week`
  #### Info:
  График **Неделя к неделе** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeByWeek: {
      previous: number; // Время простоя в секундах
      current: number; // Время простоя в секундах
    };
  }
  ~~~

  ### `POST /api/maintenance/working-hours/overview/downtime-by-buisness-unit`
  #### Info:
  График **По бизнес юнитам** на странице **Состояние оборудования - Время работы - Обзор**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  В запросе **не будет**:
  - timeRange
  - serialNumberSubstrings
  #### Response:
  ✔ 200
  ~~~ts
  {
    downtimeByBuisnessUnit: {
      name: string; // Название бизнес-юнита
      downtime: number; // Время простоя в секундах
    }[];
  }
  ~~~

## Interfaces

### IByDay
~~~ts
interface IByDay {
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sut: number;
  sun: number;
}
~~~

### ICoffeeMachine
~~~ts
interface ICoffeeMachine {
  id: number;
  code: string;
  name: string;
  type: string;
  restAlephId: string;
  status: number;
  connectType
  sim
  routerModel
  routerSN
  operator
  vpnServer
}
~~~

### IBusinessUnit
~~~ts
enum Type { FEDERAL_DISTRICT: 1, SUBJECT: 2, LOCALITY: 3, RESTAURANT: 4 }

interface IBusinessUnit {
  id
  name
  type: Type;
  clientAlephId
  parentAlephId
  chatTelegramId
}
~~~


