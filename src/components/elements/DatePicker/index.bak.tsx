// import React from 'react';
// import ReactDatePicker from "react-datepicker";  
// import "react-datepicker/dist/react-datepicker.css";

// import './style.css'

// import imgCalendar from './calendar.svg';

// import { useAppDispatch, useAppSelector } from '~/hooks';

// // const startdate = new Date();
// // const enddate = new Date();

// const DatePicker = () => {
//   const { start, end } = useAppSelector(state => state.filters.dateRange);
//   // const 

//   return (
//     <div className="picker picker-date">
//       <div className="picker__from-txt">
//         От
//       </div>
//       <div className="picker__to-txt">
//         До
//       </div>
//       <div className="picker__from-input">

//         <input type="date" name="date-start" id="date-start"  />

//         {/* <ReactDatePicker 
//           selected={start}
//           onChange={(date) => console.log(date)}
//         /> */}
//       </div>
//       <div className="picker__to-input">

//         <input type="date" name="date-start" id="date-end"  />

//         {/* <ReactDatePicker 
//           selected={end}
//           onChange={(date) => console.log(date)}
//         /> */}
//       </div>
//       <img className='picker__icon' src={imgCalendar} alt="Календарь" />
//     </div>
//   );
// }
 
// export default DatePicker;

// .picker {
//   display: grid;
//   grid-template-columns: 115px 115px 53px;
//   grid-template-rows: 20px 40px;
//   row-gap: 0;
//   column-gap: 5px;

//   &__from-txt {

//   }

//   &__to-txt {

//   }

//   &__from-input, &__to-input {
//     display: flex;
//     justify-content: space-between;
//     align-items: stretch;

//     input { 
//       flex-basis: 100%;
//       flex-shrink: 1;
//       flex-grow: 1;
//     }

//   }

//   &__from-input {
//     grid-row: 2 / 3;
//     grid-column: 1 / 2;
//   }

//   &__to-input {
//     grid-row: 2 / 3;
//     grid-column: 2 / 3;
//   }

//   &__icon {
//     grid-row: 2 / 3;
//     grid-column: 3 / 4;
//   }

// }

// .react-datepicker-wrapper {
//   height: 100%;

// }