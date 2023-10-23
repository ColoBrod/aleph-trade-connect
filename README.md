# Архитектура приложения WMF CoffeeConnect

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
    coffee-machine
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
  ModalBox

/pages
  NotFound
  ...

```


## Модель

```


/store
  /global
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
  /ui
  /route 
    Информация о последних выбранных вкладках. Нужно для 
    восстановления  иерархии при переключении между 
    родительскими вкладками
```

## Запросы API
```
/api/trend-analytics

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

- Являются ли фильтры настроек общими для всех страниц?
  ~~из вкладки "Трендовая аналитика" общими с
  "Ежедневные отчеты" и "Экспорт данных"~~
- Работающие машинки - это те, которые зеленые или машин всего?
- Дизайн страницы "страница не найдена"
- Страницы авторизации и восстановления пароля
- Что значит ТАТ
- Стрелка "Назад" в дизайне (route)
- Дополнительные иконки для корневых маршрутов
- Шаблон авторизации пользователя в систему (Layout)
- Локализация (Русский/английский)
- Темная / светлая тема