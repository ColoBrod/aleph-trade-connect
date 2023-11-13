// import React, { Component } from "react";
// import { Range, getTrackBackground } from "react-range";

// import { useAppDispatch, useAppSelector } from "~/hooks";

// import './style.css';

// const STEP = 1;
// const MIN = 0;
// const MAX = 24;

// interface Props {
//   action: any;
// }

// class TimeRange extends Component<Props> {
  
//   state = {
//     values: [7, 21]
//   };

//   render() {
//     const { action } = this.props;

//     const first = ((this.state.values[0] / 24) * 100).toFixed(2) + "%";
//     const second = ((this.state.values[1] / 24) * 100).toFixed(2) + "%";
//     const diff = this.state.values[1] - this.state.values[0];
//     return (
//       <div
//         className="timerange"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           flexWrap: "wrap",
//           margin: "0 1rem",
//         }}
//       >
//         <div className="timerange__output">
//           <div style={{ left: first }} className="timerange__first">
//             {this.state.values[0]}{diff > 2 ? ":00" : ""}
//           </div>
//           <div style={{ left: second }} className="timerange__second">
//             {this.state.values[1]}{diff > 2 ? ":00" : ""}
//           </div>
//         </div>
//         <Range
//           values={this.state.values}
//           step={STEP}
//           min={MIN}
//           max={MAX}
//           allowOverlap={false}
//           onChange={(values) => {
//             if (values[1] - values[0] < 1) return;
//             this.setState({ values });
//             // @ts-ignore
//             useAppDispatch(action({ timeStart: values[0], timeEnd: values[1] }))
//           }}
//           renderTrack={({ props, children }) => {
//             return(
//               <div
//                 onMouseDown={props.onMouseDown}
//                 onTouchStart={props.onTouchStart}
//                 style={{
//                   ...props.style,
//                   height: "36px",
//                   display: "flex",
//                   width: "100%"
//                 }}
//               >
//                 <div
//                   ref={props.ref}
//                   style={{
//                     height: "5px",
//                     width: "100%",
//                     borderRadius: "4px",
//                     background: getTrackBackground({
//                       values: this.state.values,
//                       colors: ["#ccc", "#525252", "#ccc"],
//                       min: MIN,
//                       max: MAX
//                     }),
//                     alignSelf: "center"
//                   }}
//                 >
//                   {children}
//                 </div>
//               </div>
//             )
//           }}
//           renderThumb={({ props, isDragged }) => (
//             <div
//               {...props}
//               style={{
//                 ...props.style,
//                 height: "15px",
//                 width: "15px",
//                 borderRadius: "4px",
//                 backgroundColor: "#FFF",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 boxShadow: "0px 2px 6px #AAA"
//               }}
//             >
//               <div
//                 style={{
//                   height: "5px",
//                   width: "5px",
//                   borderRadius: "50%",
//                   backgroundColor: isDragged ? "#525252" : "#CCC"
//                 }}
//               />
//             </div>
//           )}
//         />
        
//       </div>
//     );
//   }
// }

// export default TimeRange;