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
import maintenance from "./maintenance";
import administration from "./administration";
import profile from "./profile";

import Contact from "~/components/pages/Contact";
import LayoutAuth from "~/components/layouts/LayoutAuth";
import Login from "~/components/pages/Login";
import Register from "~/components/pages/Register";
import Reset from "~/components/pages/Reset";
// import Profile from "~/components/pages/Profile";

const router = createBrowserRouter([
  /**
   * Корневой раздел. Лэйаут - LayoutMain
   */
  {
    path: "", 
    element: <LayoutMain />, 
    children: [
      { 
        path: "", 
        element: <Navigate to="analytics" replace />, 
      },
      analytics,
      maintenance,
      administration,
      profile,
      { path: "contact", element: <Contact /> },
      { path: 'map', element: <Map />},
      { path: 'docs', element: <Docs />},
      { path: '*', element: <NotFound />},
    ],
  },
  
  /**
   * Рздел авторизации. Лэйаут - LayoutAuth
   */
  {
    path: "auth", 
    element: <LayoutAuth />,
    children: [
      {
        path: "",
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset",
        element: <Reset />,
      },
    ],
  },
]);

export default router;