# API docs

## Навигация

- [API docs](#api-docs)
  - [Навигация](#навигация)
  - [Общая информация](#общая-информация)
  - [Params](#params)
  - [Routes](#routes)
    - [`POST /auth/login`](#post-authlogin)
    - [`POST /auth/register`](#post-authregister)
    - [`GET /api/entities`](#get-apientities)
    - [`POST /api/analytics/trends/header`](#post-apianalyticstrendsheader)
    - [`POST /api/analytics/trends/overview/dispensings-by-date`](#post-apianalyticstrendsoverviewdispensings-by-date)
    - [`POST /api/analytics/trends/overview/consumptions`](#post-apianalyticstrendsoverviewconsumptions)
    - [`POST /api/analytics/trends/overview/cleanings`](#post-apianalyticstrendsoverviewcleanings)
    - [`POST /api/analytics/trends/overview/dispensings-by-hierarchy-level`](#post-apianalyticstrendsoverviewdispensings-by-hierarchy-level)
    - [`POST /api/analytics/trends/sales/dispensings-by-date`](#post-apianalyticstrendssalesdispensings-by-date)
    - [`POST /api/analytics/trends/sales/dispensings-by-cup-size`](#post-apianalyticstrendssalesdispensings-by-cup-size)
    - [`POST /api/analytics/trends/sales/dispensings-by-recipe`](#post-apianalyticstrendssalesdispensings-by-recipe)
    - [`POST /api/analytics/trends/sales/dispensings-by-weekday-and-time`](#post-apianalyticstrendssalesdispensings-by-weekday-and-time)
    - [`POST /api/analytics/trends/sales/dispensings-previous-vs-current`](#post-apianalyticstrendssalesdispensings-previous-vs-current)
    - [`POST /api/analytics/trends/sales/dispensings-by-path`](#post-apianalyticstrendssalesdispensings-by-path)
    - [`POST /api/analytics/dayly-reports/dispensings-by-restaurant`](#post-apianalyticsdayly-reportsdispensings-by-restaurant)
    - [`POST /api/analytics/dayly-reports/cleanings-by-restaurant`](#post-apianalyticsdayly-reportscleanings-by-restaurant)
    - [`POST /api/analytics/dayly-reports/dispensings-by-hour`](#post-apianalyticsdayly-reportsdispensings-by-hour)
    - [`POST /api/analytics/dayly-reports/dispensings-by-weekday`](#post-apianalyticsdayly-reportsdispensings-by-weekday)
    - [`POST /api/analytics/dayly-reports/dispensings-by-recipe`](#post-apianalyticsdayly-reportsdispensings-by-recipe)
    - [`POST /api/analytics/dayly-reports/dispensings-by-cup-size`](#post-apianalyticsdayly-reportsdispensings-by-cup-size)
    - [`POST /api/analytics/data-export/beverages`](#post-apianalyticsdata-exportbeverages)
    - [`POST /api/analytics/data-export/cleanings`](#post-apianalyticsdata-exportcleanings)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-hour`](#post-apimaintenanceworking-hoursoverviewdowntime-by-hour)
    - [`POST /api/maintenance/working-hours/overview/downtime-causes`](#post-apimaintenanceworking-hoursoverviewdowntime-causes)
    - [`POST /api/maintenance/working-hours/overview/downtime-errors`](#post-apimaintenanceworking-hoursoverviewdowntime-errors)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-weekday`](#post-apimaintenanceworking-hoursoverviewdowntime-by-weekday)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-week`](#post-apimaintenanceworking-hoursoverviewdowntime-by-week)
    - [`POST /api/maintenance/working-hours/overview/downtime-by-buisness-unit`](#post-apimaintenanceworking-hoursoverviewdowntime-by-buisness-unit)
    - [`GET /api/consoledata`](#get-apiconsoledata)
    - [`POST /api/timeerrordown`](#post-apitimeerrordown)
    - [Pusher](#pusher)
  - [Interfaces](#interfaces)
    - [EventType](#eventtype)
    - [IByDay](#ibyday)
    - [ICoffeeMachine](#icoffeemachine)
    - [ICoffeeMachineVendor](#icoffeemachinevendor)
    - [ICoffeeMachineModel](#icoffeemachinemodel)
    - [IBusinessUnit](#ibusinessunit)
    - [IError](#ierror)
    - [IRecipe](#irecipe)


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

interfaces:
EventType

~~~ts
interface Params {
  filters: {

    businessUnits: string[]; // Массив с ID бизнес-юнитов
    
    coffeeMachineModels: string[]; // Массив с ID кофе-машин
    
    dateRange: {
      date: {
        start: string;  // Дата начала в виде строки, например - "17.12.2023"
        end: string;    // Дата конца в виде строки, например - "19.12.2023"
      },
      time: {
        start: string;  // Время начала в виде строки, например "09:00"
        end: string;    // Время окончания в виде строки, например "21:00"
      }
    };

    beverages: number[]; // Базовый тип напитка. Что это?

    recipes: number[]; // Массив с ID рецептов.

    errors: number[]; // ID ошибок кофе-машин
    
    // Массив с серийными номерами кофе-машин. Поиск по подстроке или по регуля-
    // рному выражению может совпадать частично с фактическим номером кофе-машины
    serialNumberSubstrings: string[]; 

    // Пагинация в таблицах. perPage - количество записей выводимых на одну стра-
    // ницу. activePage - номер текущей страниццы. 
    // perPage - LIMIT
    // activePage - OFFSET
    pagination: {
      perPage: number;
      activePage: number;
    };

    // Порядок в котором выводится информация таблицы
    // 
    orderBy: {
      // Ключ поля по которому производится сортировка, например "startDateTime"
      column: string; 
      // Порядок, asc - восходящий, desc - нисходящий.
      order: 'asc' | 'desc';
    };

  }
}

~~~

## Routes

  ### `POST /auth/login`

  #### Интерфейсы
  ~~~ts
  // ID поля на котором выводим ошибку
  type InputField = "phone" | "password" | "code" | "password-confirmation";
  // Идентификатор формы. "set-password" отправляет данные на эндпоинт
  // /auth/login
  // Если указан в ответе, то переводим пользователя на следующую в форму с 
  // одним из идентификаторов:
  type Step = 'phone' | 'phone-password' | 'phone-sms-code' | 'set-password';
  // После успешной авторизации, или сразу после завершения регистрации пользо-
  // вателя (установка нового пароля), ожидаем объект с пользовательскими дан-
  // ными
  interface User {
    // Полное имя пользователя
    "fullName": string;
    // Насколько я понял, эти два поля объединяем в одно
    // "firstName": string,
    // "lastName": string,
    // Телефон пользователя в формате: +7ХХХХХХХХХХ
    "phone": string;
    "email": string;
    // Часовой пояс пользователя в формате "+03:00". Оффсет относительно UTC, 
    // Обратить внимание на leading zero после +
    "utc": string; 
  }
  ~~~

  #### Request:
  ~~~ts
  {
    phone: string;
  } |
  {
    phone: string;
    password: string;
  } |
  {
    phone: string;
    code: string; // Код из SMS
  }
  ~~~
  ___
  #### Response с формы "phone":
  ___
  ❌ 404
  ~~~json
  {
    "inputField": "phone",
    "error": "Пользователь с номером +7 (XXX) XXX-XX-XX не найден в системе."
  }
  ~~~
  ❌ 400 - Если номер указан в неправильном формате
  ~~~json
  {
    "inputField": "phone",
    "error": "Неверный формат телефонного номера - +7 (XXX) XXX-XX-XX."
  }
  ~~~
  ✔ 200 - Пользователь отправлял только телефон. Пользователь найден в системе 
  без установленного пароля
  ~~~json
  {
    "inputField": "code",
    "message": "Код с подтверждением отправлен на номер: +7 (XXX) XXX-XX-XX.",
    "nextStep": "phone-sms-code"
  }
  ~~~
  ✔ 200 - Пользователь отправлял только телефон. Пользователь найден в системе. 
  Пароль есть.
  ~~~json
  {
    "inputField": "password",
    "message": "Введите пароль",
    "nextStep": "phone-password"
  }
  ~~~
  
  ___
  #### Response с формы "phone-password":
  ___
  ❌ 401 - Если пользователь указал неверный пароль
  ~~~json
  {
    "inputField": "password",
    "error": "Неверный пароль."
  }
  ~~~
  

  ___
  #### Response с формы "phone-sms-code":
  ___

  ❌ 401 - Если пользователь указал неверный код подтверждения
  ~~~json
  {
    "inputField": "code",
    "error": "Неверный код из SMS."
  }
  ~~~

  ✔ 200 - Пользователь отправлял телефон и код подтверждения. Пользователь 
  найден в системе без установленного пароля. Направляем на регистрацию.
  ~~~json
  {
    "inputField": "code",
    "message": "Код с подтверждением отправлен на номер: +7 (XXX) XXX-XX-XX.",
    "nextStep": "set-password"
  }
  ~~~

  ___
  #### Response с формы "phone-sms-code" или "phone-password":
  ___
  
  ✔ 200 - Пользователь успешно авторизовался в системе.
  ~~~json
  {
    "user": {
      "fullName": "",
      "phone": "",
      "email": "",
      "utc": "+03:00"
    },
    "status" true,
    "token": "eyJpdiI6InUvQXgrQlFTVEV0NmJsMUVvWklqMFE9PSIsInZhbHVlIjoidGIzcVZsNktnNnVvcnpESzRvUThOL0ZsWDE1K0hYL255SGpvZ0FDRllRTVhiUSt4R0F0SHNHM1hhQUtaZFpXcTlxRktKTGFsemVQSUNRc2xMdWU0SDYzT0lGdVl5bUVpOHBDWGQ4TFJlSDhXTGRDZ2VNRXZyT3MyN3pweGxUWUoiLCJtYWMiOiJiMTY5ZGJkMzAyNDM1NTdiMmYzOTRhOThlODQ5MTA3Y2RiNzZlOTVjOGJjNzAxZmEzNzZjNjBjMTEwZmE0NWJmIiwidGFnIjoiIn0%3D"
  }
  ~~~

  ### `POST /auth/register`
  #### Request:
  ~~~ts
  {
    // Телефон пользователя в формате: +7ХХХХХХХХХХ
    phone: string;
    // Подтверждение пароля (повторный ввод) происходит на стороне клиента 
    // перед отправкой запроса на сервер
    password: string;
  } 
  ~~~
  #### Response:
  ❌ 404 - Если пользователь с таким номером не найден в системе
  ~~~json
  {
    "inputField": "password",
    "error": "Пользователь с номером +7 (XXX) XXX-XX-XX не найден в системе."
  }
  ~~~
  ✔ 200 - Пароль и подтверждение совпали. Пользователь зарегистрирован
  ~~~json
  {
    "user": {
      "fullName": "",
      "phone": "",
      "email": "",
      "utc": "+03:00"
    },
    "status" true,
    "token": "eyJpdiI6InUvQXgrQlFTVEV0NmJsMUVvWklqMFE9PSIsInZhbHVlIjoidGIzcVZsNktnNnVvcnpESzRvUThOL0ZsWDE1K0hYL255SGpvZ0FDRllRTVhiUSt4R0F0SHNHM1hhQUtaZFpXcTlxRktKTGFsemVQSUNRc2xMdWU0SDYzT0lGdVl5bUVpOHBDWGQ4TFJlSDhXTGRDZ2VNRXZyT3MyN3pweGxUWUoiLCJtYWMiOiJiMTY5ZGJkMzAyNDM1NTdiMmYzOTRhOThlODQ5MTA3Y2RiNzZlOTVjOGJjNzAxZmEzNzZjNjBjMTEwZmE0NWJmIiwidGFnIjoiIn0%3D"
  }
  ~~~

  ### `GET /api/entities`

  #### Info:

  **ВАЖНО**: Этот эндпоинт под вопросом. Можно объединить все эндпоинты `/api/entities` в один и запрашивать сразу после авторизации пользователя в системе.

  - [`ICoffeeMachine`](#icoffeemachine)
  - [`ICoffeeMachineModel`](#icoffeemachinemodel)
  - [`ICoffeeMachineVendors`](#icoffeemachinevendors)
  - [`IBusinessUnit`](#ibusinessunit)
  - [`IRecipe`](#irecipe)
  - [`IError`](#ierror)


  #### Request:
  Без дополнительных параметров.

  #### Response:

  ✔ 200
  ~~~ts
  {
    coffeeMachines: ICoffeeMachine[];
    coffeeMachineModels: ICoffeeMachineModel[];
    coffeeMachineVendors: ICoffeeMachineVendors[];
    businessUnits: IBusinessUnit[];
    recipes: IRecipe[];
    errors: IError[];
  }
  ~~~
  #### Пример JSON
  ~~~json
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

  ### `POST /api/analytics/dayly-reports/dispensings-by-restaurant`
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

  ### `POST /api/analytics/dayly-reports/cleanings-by-restaurant`
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

  ### `POST /api/analytics/dayly-reports/dispensings-by-hour`
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

  ### `POST /api/analytics/dayly-reports/dispensings-by-weekday`
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

  ### `POST /api/analytics/dayly-reports/dispensings-by-recipe`
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

  ### `POST /api/analytics/dayly-reports/dispensings-by-cup-size`
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

  ### `POST /api/analytics/data-export/beverages`
  #### Info:
  Таблица на странице **Аналитика - Экспорт данных - Напитки**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  ~~~ts
  {
    filters: {
      pagination: {
        activePage: number;
        perPage: number;
      }
    }
  }
  ~~~
  #### Response:
  ✔ 200
  ~~~ts
  {
    { 
      federalDistrict: string;
      city: string;
      restaurant: string;
      machineModel: string;
      serialNumber: number, 
      date: string;
      time: string;
      utc: string; 
      type: string;
      planned: number;
      total: number;
    },
  }
  ~~~

  ### `POST /api/analytics/data-export/cleanings`
  #### Info:
  Таблица на странице **Аналитика - Экспорт данных - Напитки**
  #### Request:
  JSON в теле (body) запроса: [`Params`](#params)  
  ~~~ts
  {
    filters: {
      pagination: {
        activePage: number;
        perPage: number;
      }
    }
  }
  ~~~
  #### Response:
  ✔ 200
  ~~~ts
  {
    { 
      federalDistrict: string;
      city: string;
      restaurant: string;
      machineModel: string;
      serialNumber: number, 
      date: string;
      time: string;
      utc: string; 
      cupSize: string;
      total: number;
      recipe:	string;
    },
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
      mon: number; // Время простоя в секундах
      tue: number;
      wed: number;
      thu: number;
      fri: number;
      sat: number;
      sun: number;
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

  ### `GET /api/consoledata`
  #### Info:
  #### Request:
  Фильтры: eventTypes, businessUnits
  #### Response:
  ✔ 200
  ~~~ts
  {
    id: string;
    coffeeMachineId: string;
    startDateTime: string;
    duration: string;
    errorCode: string;
    errorText: string;
  }[];
  ~~~

  Пример JSON:
  ~~~json
  [
    {
      "id": "655",
      "coffeeMachineId": "4NfMx-6huNY-3GmU1-KH3Y5-uvbMH",
      "startDateTime": "2023-08-23 12:01:43",
      "duration": "8 дней 22 часа",
      "errorCode": "50",
      "errorText": "Неизвестная ошибка"
    },
    ...
  ]
  ~~~
  
  ### `POST /api/timeerrordown`

  #### Request:
  ~~~ts
  {
    ids: number[];
  }
  ~~~
  Пример JSON:
  ~~~json
  {
    "ids": [ 655, 1024, 713 ]
  }
  ~~~
  #### Response:
  ✔ 200
  ~~~ts
  {
    id: number;
    duration: string;
  }[];
  ~~~
  Пример JSON:
  ~~~json
  [
    {
      "id": 655,
      "duration": "8 дней 23 часа",
    },
    {
      "id": 1024,
      "duration": "5 мин 14 сек",
    },
    {
      "id": 713,
      "duration": "1 час 21 мин",
    },
  ]
  ~~~
  ### Pusher
  


## Interfaces

### EventType
~~~ts
type EventType = 'event' | 'info' | 'maintenance' | 'error' | 'tech-info';
~~~

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
  id: string; // Aleph id
  modelId: string; // Aleph ID модели
  restaurantId: string; // Aleph ID ресторана
  serialNumber: string;
  name: string;
}
~~~

### ICoffeeMachineVendor
~~~ts
interface ICoffeeMachineVendor {
  id: number; // ID
  name: string;
}
~~~

### ICoffeeMachineModel
~~~ts
interface ICoffeeMachineModel {
  id: string; // Aleph Id
  name: string;
  vendorId: number;
}
~~~

### IBusinessUnit

~~~ts
enum Type { RESTAURANT: '1', CLIENT: '2', STRUCTURE: '3' }

interface IBusinessUnit {
  id: string;
  parentId: string | null;
  name: string;
  type: Type;
  chatTelegramId: string;

  // Ресторан
  address?: string;
  lat?: string;
  lon?: string;
}
~~~

### IError
~~~ts
interface IError {
  id: string;
  type: string; 
  code: number;
  description: string; 
}
~~~

### IRecipe
~~~ts
interface IRecipe {
  id: string;
  name: string;
  cupSize: "S" | "M" | "L";
}
~~~



