import React, { Component } from "react";
import { Range, getTrackBackground } from "react-range";

import { useAppDispatch, useAppSelector } from "~/hooks";
// import { timeSet } from "~/store/pages/analytics/trends/sales";
import { dateRangeSet } from "~/store/filters/analytics/trends";

import './style.css';
import { IFiltersDateRange } from "~/interfaces/filters";

const STEP = 1;
const MIN = -62;
const MAX = 0;

interface Props {
  dateRange: IFiltersDateRange['dateRange'];
  dateRangeSet: Function;
}

const DateRange = ({ dateRange, dateRangeSet }: Props) => {
  let { start: dateStart, end: dateEnd }: any = dateRange.date;
  // let { start: dateStart, end: dateEnd }: any = useAppSelector(
  //   state => state.filters.analytics.trends.dateRange.date
  // );

  const dispatch = useAppDispatch();

  {
    const [m, d, y] = dateStart.split("/").map((el: string) => parseInt(el));
    dateStart = new Date(y, m-1, d)
  }
  {
    const [m, d, y] = dateEnd.split("/").map((el: string) => parseInt(el));
    dateEnd = new Date(y, m-1, d)
  } 
  const diffTime1 = -dateDiffInDays(dateStart, new Date());
  const diffTime2 = -dateDiffInDays(dateEnd, new Date());
  // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const first = Math.abs((diffTime1 / 62) * 100).toFixed(2) + "%";
  const second = Math.abs((diffTime2 / 62) * 100).toFixed(2) + "%";
  const diff = diffTime2 - diffTime1;

  const handleChange = (values: number[]) => {
    if (Math.abs(values[0]) - Math.abs(values[1]) < 1) return;
    const startValue = values[0];
    const endValue = values[1];
    const curDate = new Date();
    const startDate = new Date()
    startDate.setDate(curDate.getDate() + startValue);
    const endDate = new Date()
    endDate.setDate(curDate.getDate() + endValue);
    const start = startDate.toLocaleDateString("en-US");
    const end = endDate.toLocaleDateString("en-US");
    dispatch(dateRangeSet({ start, end }));
  }

  return (
    <div
      className="daterange"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "0 1rem",
      }}
    >
      <div className="daterange__output">
        <div style={{ right: first }} className="daterange__first">
          {dateStart.getDate()}.{dateStart.getMonth() + 1}.{dateStart.getFullYear()}
        </div>
        <div style={{ right: second }} className="daterange__second">
          {dateEnd.getDate()}.{dateEnd.getMonth() + 1}.{dateEnd.getFullYear()}
        </div>
      </div>
      <Range
        values={[diffTime1, diffTime2]}
        step={STEP}
        min={MIN}
        max={MAX}
        allowOverlap={false}
        onChange={(values) => {
          handleChange(values);
          // if (Math.abs(values[0]) - Math.abs(values[1]) < 1) return;
          // const start = values[0];
          // const end = values[1];
          // dispatch(dateRangeSet({ start, end }));
        }}
        renderTrack={({ props, children }) => {
          return(
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [diffTime1, diffTime2],
                    colors: ["#B9B9B9", "#0F6CBD", "#B9B9B9"],
                    min: MIN,
                    max: MAX
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )
        }}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "18px",
              width: "18px",
              borderRadius: "9px",
              backgroundColor: "#FFF",
              borderColor: "#D1D1D1",
              borderWidth: "1px",
              borderStyle: "solid",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA"
            }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                // 705141
                backgroundColor: isDragged ? "#705141" : "#705141"
              }}
            />
          </div>
        )}
      />
      
    </div>
  );

  function dateDiffInDays(a: Date, b: Date): number {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}

export default DateRange;