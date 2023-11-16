// Устанавливаем первый день месяца
const date = new Date();
date.setDate(1);

// Последний день месяца - number (30)
const lastDay = new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getDate();

// Последний день предыдущего месяца - number (31)
const prevLastDay = new Date(
  date.getFullYear(),
  date.getMonth(),
  0
).getDate();

// День недели первого дня месяца
const firstDayIndex = fmtDayIndex(date.getDay());

// День недели последнего дня месяца
const lastDayIndex = fmtDayIndex(new Date(
  date.getFullYear(),
  date.getMonth() + 1,
  0
).getDay());

// console.log(firstDayIndex, lastDayIndex);

// Устанавливает Понедельник как 0, Вс - 6
function fmtDayIndex(index) {
  index -= 1;
  return index === -1 ? 6 : index;
}

const dates = [];

// 
let d = new Date(date);
d.setDate(d.getDate() - (firstDayIndex + 1));
for (let i = 0; i < firstDayIndex; i++) {
  d.setDate(d.getDate() + 1);
  dates.push(d.toString());
  // dates.unshift(d.toString());
}

// d = new Date(date);

// 
for (let i = 0; i < lastDay; i++) {
  d.setDate(d.getDate() + 1);
  dates.push(d.toString());
}

// console.log(dates);

//
for (let i = lastDayIndex; i < 6; i++) {
  d.setDate(d.getDate() + 1);
  dates.push(d.toString());
}

console.log(dates);





// function generateCalendarDates(startYear, startMonth, startDay, numDays) {
//   var startDate = new Date(startYear, startMonth, startDay);
//   var dates = [];

//   for (var i = 0; i < numDays; i++) {
//     var currentDate = new Date(startDate);
//     currentDate.setDate(startDate.getDate() + i);
//     var formattedDate = (currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
//     dates.push(formattedDate);
//   }

//   return dates;
// }

// // Example usage for November 15, 2023, assuming Monday is the first day of the week
// var startDate = new Date(2023, 10, 13); // 10 for November (zero-indexed), 13 for November 13, 2023
// var numDays = 34; // Number of days you want

// var calendarDates = generateCalendarDates(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), numDays);
// console.log(calendarDates);