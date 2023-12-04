import React from 'react';
import { Navigate, RouteObject } from "react-router-dom";
import InnerWithTabs from "~/components/layouts/InnerWithTabs";
import InnerWithNestedTabs from "~/components/layouts/InnerWithNestedTabs";
import Maintenance_WorkingHours_Overview from '~/components/pages/Maintenance/WorkingHours/Overview';
import Maintenance_WorkingHours_Settings from '~/components/pages/Maintenance/WorkingHours/Settings';
import Maintenance_Monitoring from '~/components/pages/Maintenance/Monitoring';
import Maintenance_DataExport_Time from '~/components/pages/Maintenance/DataExport/Time';
import Maintenance_DataExport_Events from '~/components/pages/Maintenance/DataExport/Events';


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
          element: <Maintenance_WorkingHours_Settings />,
        },
      ],
    },
    {
      path: "monitoring",
      element: <InnerWithNestedTabs tabs={[
        { children: "Все",                    path: `/maintenance/monitoring/all` },
        { children: "События",                path: `/maintenance/monitoring/events` },
        { children: "Информация",             path: `/maintenance/monitoring/info` },
        { children: "Обслуживание",           path: `/maintenance/monitoring/maintanence` },
        { children: "Ошибки",                 path: `/maintenance/monitoring/errors` },
        { children: "Техническая информация", path: `/maintenance/monitoring/tech-info` },
      ]} />,
      children: [
        {
          path: "",
          element: <Navigate to="all" replace />,
        },
        {
          path: ":type",
          element: <Maintenance_Monitoring />,
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
          element: <Maintenance_DataExport_Time />,
        },
        {
          path: "events",
          element: <Maintenance_DataExport_Events />,
        },
      ],
    },
  ],
}

export default maintenance;