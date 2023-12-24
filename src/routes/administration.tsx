import React from 'react';
import { Navigate, RouteObject } from "react-router-dom";
import InnerWithTabs from "~/components/layouts/InnerWithTabs";
import InnerWithNestedTabs from "~/components/layouts/InnerWithNestedTabs";

import Machines from '~/components/pages/Administration/Machines';
import CompanyStructure from '~/components/pages/Administration/CompanyStructure';

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
          element: <Machines />,
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
          element: <CompanyStructure />,
        },
      ],
    },
  ],
}

export default administration;