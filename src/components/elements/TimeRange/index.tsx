import React, { Component } from "react";
import { Range, getTrackBackground } from "react-range";

import { useAppDispatch, useAppSelector } from "~/hooks";
import { timeSet } from "~/store/pages/analytics/trends/sales";

import './style.css';

const STEP = 1;
const MIN = 0;
const MAX = 24;

interface Props {
}

const TimeRange = (props: Props) => {

  const { timeStart, timeEnd } = useAppSelector(
    state => state.pages.analytics.trends.sales.dispensingsByWeekdayAndTime.filters
  );
  const dispatch = useAppDispatch();

  const first = ((timeStart / 24) * 100).toFixed(2) + "%";
  const second = ((timeEnd / 24) * 100).toFixed(2) + "%";
  const diff = timeEnd - timeStart;

  return (
    <div
      className="timerange"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "0 1rem",
      }}
    >
      <div className="timerange__output">
        <div style={{ left: first }} className="timerange__first">
          {timeStart}{diff > 0 ? ":00" : ""}
        </div>
        <div style={{ left: second }} className="timerange__second">
          {timeEnd}{diff > 0 ? ":00" : ""}
        </div>
      </div>
      <Range
        values={[timeStart, timeEnd]}
        step={STEP}
        min={MIN}
        max={MAX}
        allowOverlap={false}
        onChange={(values) => {
          if (values[1] - values[0] < 1) return;
          dispatch(timeSet({ timeStart: values[0], timeEnd: values[1] }))
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
                    values: [timeStart, timeEnd],
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
}

export default TimeRange;