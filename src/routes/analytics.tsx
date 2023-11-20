import React, { Children } from "react";

import { Navigate, RouteObject } from "react-router-dom";
import InnerWithTabs from "~/components/layouts/InnerWithTabs";
import InnerWithNestedTabs from "~/components/layouts/InnerWithNestedTabs";
import Analytics_Trends_Overview from "~/components/pages/Analytics/Trends/Overview";
import Analytics_Trends_Sales from "~/components/pages/Analytics/Trends/Sales";
import Analytics_Trends_Settings from "~/components/pages/Analytics/Trends/Settings";
import DaylyReports from "~/components/pages/Analytics/DaylyReports";
import Analytics_DataExport_Beverages from "~/components/pages/Analytics/DataExport/Beverages";
import Analytics_DataExport_Cleanings from "~/components/pages/Analytics/DataExport/Cleanings";

const analytics: RouteObject = { 
  path: "analytics", 
  element: <InnerWithTabs tabs={[
    { children: "Трендовая аналитика", path: `/analytics/trends` },
    { children: "Ежедневные отчеты", path: `/analytics/dayly-reports` },
    { children: "Экспорт данных", path: `/analytics/data-export` },
  ]} />,
  children: [
    {
      path: "",
      element: <Navigate to="trends" replace />,
    },
    {
      path: "trends",
      element: <InnerWithNestedTabs tabs={[
        { children: "Обзор", path: `/analytics/trends/overview` },
        { children: "Продажи", path: `/analytics/trends/sales` },
        { children: "Настройки", path: `/analytics/trends/settings` },
      ]} />,
      children: [
        {
          path: "",
          element: <Navigate to="overview" replace />,
        },
        {
          path: "overview",
          element: <Analytics_Trends_Overview />,
        },
        {
          path: "settings",
          element: <Analytics_Trends_Settings />,
        },
        {
          path: "sales",
          element: <Analytics_Trends_Sales />,
        },
      ]
    },
    {
      path: "dayly-reports",
      element: <InnerWithNestedTabs tabs={[
      ]} />,
      children: [
        {
          path: "",
          element: <DaylyReports />,
        },
      ],
    },
    {
      path: "data-export",
      element: <InnerWithNestedTabs tabs={[
        { children: "Напитки", path: `/analytics/data-export/beverages` },
        { children: "Чистки", path: `/analytics/data-export/cleanings` },
      ]} />,
      children: [
        {
          path: "",
          element: <Navigate to="beverages" replace />,
        },
        {
          path: "beverages",
          element: <Analytics_DataExport_Beverages />,
        },
        {
          path: "cleanings",
          element: <Analytics_DataExport_Cleanings />,
        },
      ]
    },
  ],
}

export default analytics;