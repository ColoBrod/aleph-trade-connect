import React, { Children } from "react";

import { Navigate, RouteObject } from "react-router-dom";
import Profile from "~/components/pages/Profile";

const profile: RouteObject = {
  path: "profile", 
  element: <Profile />,
  children: [
    {
      path: "",
      element: <Navigate to="common" replace />
    },
    {
      path: "common",
      element: <h1>Личные данные</h1>,
    },
    {
      path: "credentials",
      element: <h1>Пароль</h1>,
    },
    {
      path: "delete-account",
      element: <h1>Удалить аккаунт</h1>,
    },
    
  ],
}

export default profile;