# Архитектура приложения WMF CoffeeConnect

Есть ли уже база данных для приложения? Посмотреть?

## Лейауты

- LayoutAuth
  - Страница авторизации
  - Страница восстановления пароля
- LayoutMain
  - props: 
  - Лэйаут, который используется для отрисовки почти всех страниц
- LayoutInner
  - 

## Маршруты

~~~
/settings - TODO: Убрать настройки в остальных маршрутах
/??????
  /trend-analytics
    /overview
    /settings
    /sales
  /dayly-reports
    /beverages
    /cleanings
  /data-export
    /

/maintenance | /equipment-state
  /working-hours | /uptime
    /overview
    /settings
  /monitoring
    /
  /data-export
    /time
    /events
  /overview
  /settings

/administration
  /machines
  /company-structure

/map

/feedback | /support

/profile
  /common
  /credentials
  /delete-account

?display-modal-box=true
  &page=
    coffee-machine | new-ticket ?
  &tab=
    common
    location
    monitoring
    event-history
    maintenance
    spare-parts-replacement

/auth

/overview


~~~

## Контейнеры
## Структура компонентов

```
/components
  /ui
    Logo
    ConnectStatus ?
    SearchBar
    Avatar ?
    Button
    Range
    NavIcon
    ButtonRefresh
    Icon
      IconClose ?
      IconLink ?
  /layout
    NavBar
      NavElement
        NavIcon
  /widgets
    Widget ?
      props: layout (inline, block), accent, amount, description, icon

  TabsPanel
    props: layout (top, bottom)
    Tab
      props: layout (top, bottom)
      NavLink
  Diagram (is it container?)
    BarChart
    PieChart
    LineChart
  InfoBlock
  FilterBlock
  ModalBox

/pages
  PageLoader - Анимация загрузки страницы
  ErrorPage
    NotFound - Некорректный URL
  ...

```


## Модель

### Рестораны:

'federal-district' - Федеральный округ (ЦФО)  
'federation-subject' - Субъект федерации (Владимирская область)  
'settlement' - Населенный пункт (вместо "Город")  
'restaurant' - Конкретный ресторан с адресом  

### 

Я предлагаю делать один раз запрос на несколько эндпоинтов за раз на один раздел. Далее, если расчет на клиенте может занимать какое-то время, выполнять его асинхронно, подменяя загрузчиком.

```
/store

  /general | /common | /global
    lang: 'ru' | 'en'
    theme: 'dark' | 'light'

  /auth
    id: number
    firstName: string
    lastName: string
    role: 'superuser' | 'admin' | 'user'
    email
    mobile
    timezone
    accessToken
    refreshToken

  /entities 
    /locations
    /dispensings
    /productGroups
    /machineModels
    /machines
    /recipes
    /syrups
    /cleanings
    /downtime
    /settings
      dateRange: [startDate, endDate], // Насколько я понял время и дата
      timeRange: [startTime, endTime], // не зависят друг от друга
      restaurants: [
        {
          id: 1001,
          type: 'federal-district',
          name: 'Центральный федеральный округ',

          // Variant 1
          children: [
            1014, 1015, ...
          ],

          // Variant 2
          children: [
            {
              id: 1014,
              type: 'settlement',
              name: ''
            }
          ],
        }
      ],
      coffeeMachines: {
        selectAll: Boolean
        coffeeMachines: [
          { id: 1, selected: Boolean }
        ]
        -- или --
        coffeeMachines: CoffeeMachine[
          { id: 1, modelId, name ... }
        ]
      }
      serialNumbers: String[] 

    /
  /ui
  /route 
    Информация о последних выбранных вкладках. Нужно для 
    восстановления  иерархии при переключении между 
    родительскими вкладками
```
## Память (localStorage, cookies)


## Запросы API
```
/api/auth
  POST
    /login
  POST
    /logout ? 
  POST
    /change-password
  POST
    /delete-account

/api/locations
  GET
    id: number;
    parentId: number;
    type: 'federal-district' | 'federation-subject' | 'settlement' | 'restaurant'

/api/dispensings - за последние 59-61 день (2 месяца)
  GET 
    id: number;
    locationId: number;
    machineId: number;
    recipeId: number;
    localDate: string;
    cupSize: string;
    status: string;
    syrup: number;

/api/product-groups ?
  GET
    id: number;
    name: string;

/api/machines-models ?
  GET
    id: number;
    groupId: number;
    name: string;
    sku: number;

/api/machines
  GET
    id: number;
    modelId: number; ?
    locationId: number;
    path: string;
    number: string;
  POST - добавить кофе-машину 

/api/recipes
  GET
    id: number;
    name: string;
    water: number;
    milk: number;
    coffee: number;
    chocolate: number;

/api/syrups
  GET
    id: number;
    name: string;

/api/cleanings
  GET
    id: number;
    machineId: number;
    datetime: Date;

/api/users/:id
  GET - Получить пользователя по 
  POST - добавить пользователя в группу администратора
  UPDATE - 

/api/idletime | /api/downtime

```

## Файлы
.env - В зависимости от окружения: API, Cors, source-maps, my-dev-tools
.gitignore
tsconfig.json
manifest.json
serviceWorker.js
favicon.png
robots.txt
postcss

## Вопросы

- Есть ли форма подключения новой машинки?
- Названия всех моделей уже известны?
- Название - AlephTradeConnect
- SKU - тоже самое, что и штрих-код
- "Создать обращение" - это модальное окно? Как выглядит?
- Карточку машинки делаем также в виде модального окна?
- Что такое бизнес-юнит
- Как вычисляется время простоя коффе-машин?
- Серийные номера в фильтрах. Должны валидироваться? Или они просто используются как часть регулярного выражения при запросе в БД?
- Являются ли фильтры настроек общими для всех страниц?
  ~~из вкладки "Трендовая аналитика" общими с
  "Ежедневные отчеты" и "Экспорт данных"~~
- Работающие машинки - это те, которые зеленые или машин всего?
- Дизайн страницы "страница не найдена"
- Страницы авторизации и восстановления пароля
- Что значит ТАТ и Path?
- Стрелка "Назад" в дизайне (route)
- Дополнительные иконки для корневых маршрутов
- Шаблон авторизации пользователя в систему (Layout)
- Локализация (Русский/английский)
- Темная / светлая тема