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
 
/analytics            - Аналитика
  /trends             - Трендовая аналитика
    /overview         - Обзор
    /sales            - Продажи
    /settings         - Настройки
  /dayly-reports      - Ежедневные отчеты
  /data-export        - Экспорт данных
    /beverages        - Напитки 
    /cleanings        - Читски
/maintenance          - Состояние оборудования
  /working-hours      - Время работы
    /overview         - Обзор
    /settings         - Настройки
  /monitoring         - Мониторинг
  /data-export        - Экспорт данных
    /time             - Время    
    /events           - События      
/administration       - Администрирование
  /machines           - Кофе-машины
  /company-structure  - Структура компании
/profile              - Профиль
  /common             - Личные данные
  /credentials        - Пароль      
  /delete-account     - Удалить аккаунт 
/contact              - Contact
/map                  - Карта
/docs                 - Справка       

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
~~~

~~~
/analytics
  /trends
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

  ????????????
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

/docs
~~~

## Контейнеры
## Структура компонентов

```
/components
  /ui
    Logo
    Loader
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
  Settings
    props: layout (sidebar | page)

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

## Задачи

По компонентам

Самые важные и самые сложные:

Chart
  BarChart
    props: 'guidelines'
  PieChart
  LineChart

Table - таблица с сортировкой и пагинацией.


## Вопросы


- Есть ли форма подключения новой машинки?
- 
- Названия всех моделей уже известны?

- Как вычисляется время простоя кофе-машин?

- Работающие машинки - это те, которые зеленые или машин всего?

- Локализация (Русский/английский)
- Темная / светлая тема