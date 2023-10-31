# API docs

## Interfaces

### IByDay
~~~ts
interface IByDay {
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sut: number;
  Sun: number;
}
~~~


## Routes

~~~
GET   /api/analytics/trends/overview/header
{
  workingMachines: number;
  dispensingsTotal: number;
}

GET   /api/analytics/trends/overview/dispensings-by-date
{
  currentWeek: IByDay;
  previouseWeek: IByDay;
}

GET   /api/analytics/trends/overview/consumptions
{
  water: number;
  milk: number;
  coffee: number;
  chocolate: number;
}

GET   /api/analytics/trends/overview/cleanings
{
  currentWeek: number;
  previousWeek: number;
}

GET   /api/analytics/trends/overview/dispensings-by-hierarchy-level
[
  { buisenessUnit: string;  }
]


~~~