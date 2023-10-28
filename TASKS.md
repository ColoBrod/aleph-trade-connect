# Components

Умные компоненты
Тупые компоненты - общаются с API - передают 

##

Logo
Вертикальное / Горизонтальное / Квадратное

Loader
Загрузчик (анимация, пока ожидаем ответа от backend)

SearchBar
Поиск машин и серийных номеров, выпадающий список

Avatar 
Иконка пользователя в верхнем правом углу. Вызывает всплывающее окно со ссылками.

Button 
handler, LG, MD, SM, dark, light, outline...

Badge
На примере UTC.

Range
Выбор временного промежутка

Calendar
Выбор дат

NavIcon
Иконки на левой панели

Notification
Пример - уведомление об ошибке

ModalBox
Всплывающее окно с карточкой машинки

Widget
layout - "chart", "consumption", "horizontal", "header"...

Tab & TabsPanel
layout - "top-level", "low-level"

Diagram
type: "bar", "bar-with-guidlines", "pie", "line"
  BarChart
  BarChartWithGuidelines
  PieChart
  LineChart
Универсальный компонент для отрисовки графиков

InfoBlock
Контейнер на дашборде, содержащий виджеты, графики или таблицы. Может быть до 6
на одной странице.

FilterBlock
Блок с фильтрами (по модели машинки). Можно будет реюзать для фильтра по другим...

FilterTree
Блок с чекбоксами для фильтрации по бизнес-юнитам.

MapIframe
Встраивание карты. Параметры?

Table
Таблица с фильтрацией по полям и пагинацией.


## UI

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