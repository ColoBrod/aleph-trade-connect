// import { RootState } from ".";
import React, { ReactNode } from "react";
import { IFiltersDateRange } from "~/interfaces/filters";

export const getPeriod = (
  dateRange: IFiltersDateRange["dateRange"],
  format: "long" | "short" = "long",
  type: "object" | "string" = "string"
): ReactNode | { recent: string; diff: string; days: string } => {
  const { start, end } = dateRange.date;
  const date1 = new Date(start);
  const date2 = new Date(end);
  const today = new Date();
  if (date2 < date1)
    return "Date range error. End date is less than start date";
  // @ts-ignore
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diff = diffDays.toString();
  const recent =
    today.setHours(0, 0, 0, 0) === date2.setHours(0, 0, 0, 0)
      ? getNoun(diffDays, "последний", "последние", "последние")
      : "";
  const days = getNoun(diffDays, "день", "дня", "дней");
  // return format === "long"
  //   ? <>{recent} <b>{diff}</b> {days}</>
  //   : <><b>{diff}</b> {days}</>;
  if (type === "string")
    return format === "long" ? `${recent} ${diff} ${days}` : `${diff} ${days}`;
  else if (type === "object") return { recent, diff, days };
};

function getNoun(number: number, one: string, two: string, five: string): string {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}