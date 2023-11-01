import React from 'react';
import { Navigate, RouteObject } from "react-router-dom";
import InnerWithTabs from "~/components/layouts/InnerWithTabs";
import InnerWithNestedTabs from "~/components/layouts/InnerWithNestedTabs";
import Maintenance_WorkingHours_Overview from '~/components/pages/Maintenance/WorkingHours/Overview';

const maintenance: RouteObject = { 
  path: "maintenance", 
  element: <InnerWithTabs tabs={[
    { children: "Время работы", path: `/maintenance/working-hours` },
    { children: "Мониторинг", path: `/maintenance/monitoring` },
    { children: "Экспорт данных", path: `/maintenance/data-export` },
  ]} />,
  children: [
    {
      path: "",
      element: <Navigate to="working-hours" replace />
    },
    {
      path: "working-hours",
      element: <InnerWithNestedTabs tabs={[
        { children: "Настройки", path: `/maintenance/working-hours/settings` },
        { children: "Обзор", path: `/maintenance/working-hours/overview` },
      ]} />,
      children: [
        {
          path: "",
          element: <Navigate to="overview" replace />,
        },
        {
          path: "overview",
          element: <Maintenance_WorkingHours_Overview />,
        },
        {
          path: "settings",
          element: <h1>Настройки</h1>,
        },
      ],
    },
    {
      path: "monitoring",
      element: <InnerWithNestedTabs tabs={[
      ]} />,
      children: [
        {
          path: "",
          element: <h1>Мониторинг</h1>,
        },
      ],
    },
    {
      path: "data-export",
      element: <InnerWithNestedTabs tabs={[
        { children: "Время", path: `/maintenance/data-export/time` },
        { children: "События", path: `/maintenance/data-export/events` },
      ]} />,
      children: [
        {
          path: "",
          element: <Navigate to="time" replace />,
        },
        {
          path: "time",
          element: <h1>Время</h1>,
        },
        {
          path: "events",
          element: <h1>События</h1>,
        },
      ],
    },
  ],
}

export default maintenance;