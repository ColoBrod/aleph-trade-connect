import React from 'react';
import { Navigate, RouteObject } from "react-router-dom";
import InnerWithTabs from "~/components/layouts/InnerWithTabs";
import InnerWithNestedTabs from "~/components/layouts/InnerWithNestedTabs";

const administration: RouteObject = { 
  path: "administration", 
  element: <InnerWithTabs tabs={[
    { children: "Кофе-машины", path: `/administration/machines` },
    { children: "Структура компании", path: `/administration/company-structure` },
  ]} />,
  children: [
    {
      path: "",
      element: <Navigate to="machines" replace />
    },
    {
      path: "machines",
      element: <InnerWithNestedTabs tabs={[
      ]} />,
      children: [
        {
          path: "",
          element: <h1>Кофе-машины</h1>,
        },
      ],
    },
    {
      path: "company-structure",
      element: <InnerWithNestedTabs tabs={[
      ]} />,
      children: [
        {
          path: "",
          element: <h1>Структура компании</h1>,
        },
      ],
    },
  ],
}

export default administration;