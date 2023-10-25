import React from "react";

import { Navigate, RouteObject } from "react-router-dom";
import InnerWithTabs from "~/components/layouts/InnerWithTabs";
import InnerWithNestedTabs from "~/components/layouts/InnerWithNestedTabs";

const analytics: RouteObject = { 
  path: "analytics", 
  element: <InnerWithTabs tabs={[
    { children: "Trends", path: `/analytics/trends` },
    { children: "Dayly Reports", path: `/analytics/dayly-reports` },
    { children: "Data Export", path: `/analytics/data-export` },
  ]} />,
  children: [
    {
      path: "",
      element: <Navigate to="trends" replace />,
    },
    {
      path: "trends",
      element: <InnerWithNestedTabs tabs={[
        { children: "Overview", path: `/analytics/trends/overview` },
        { children: "Sales", path: `/analytics/trends/sales` },
        { children: "Settings", path: `/analytics/trends/settings` },
      ]} />,
      children: [
        {
          path: "",
          element: <Navigate to="overview" replace />,
        },
        {
          path: "overview",
          element: <h1>Overview</h1>,
        },
        {
          path: "settings",
          element: <h1>Settings</h1>,
        },
        {
          path: "sales",
          element: <h1>Sales</h1>,
        },
      ]
    },
    {
      path: "dayly-reports",
      element: <h1>Dayly reports</h1>
    },
    {
      path: "data-export",
      element: <h1>Data Export</h1>
    },
  ],
}

export default analytics;