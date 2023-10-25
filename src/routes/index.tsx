import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

// Layouts
import LayoutMain from "~/components/layouts/LayoutMain";
import InnerWithTabs from "~/components/layouts/InnerWithTabs";

// Pages
import Loader from "~/components/pages/Loader";
import NotFound from "~/components/pages/NotFound";
import Map from "~/components/pages/Map";
import Docs from "~/components/pages/Docs";

// Routes
import analytics from './analytics';

const router = createBrowserRouter([
  {
    path: "", 
    element: <LayoutMain />, 
    children: [
      { 
        path: "", 
        element: <Navigate to="analytics" replace />, 
      },
      analytics,
      { 
        path: "maintenance", 
        element: <InnerWithTabs tabs={[
          { children: "Время работы", path: `/maintenance/working-hours` },
          { children: "Мониторинг", path: `/maintenance/monitoring` },
          { children: "Экспорт данных", path: `/maintenance/data-export` },
        ]} />,
        children: [],
      },
      { 
        path: "administration", 
        element: <InnerWithTabs tabs={[
          { children: "Машины", path: `/administration/machines` },
          { children: "Структура компании", path: `/administration/company-structure` },
        ]} />,
        children: [],
      },
      { path: 'map', element: <Map />},
      { path: 'docs', element: <Docs />},
      { path: '*', element: <NotFound />},
    ],
  }
]);

export default router;