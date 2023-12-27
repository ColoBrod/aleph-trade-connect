import React, { Children } from "react";

import { Navigate, RouteObject } from "react-router-dom";
import Profile from "~/components/pages/Profile";

import Common from "~/components/pages/Profile/Common";
import Credentials from "~/components/pages/Profile/Credentials";
import DeleteAccount from "~/components/pages/Profile/DeleteAccount";

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
      element: <Common />,
    },
    {
      path: "credentials",
      element: <Credentials />,
    },
    {
      path: "delete-account",
      element: <DeleteAccount />,
    },
    
  ],
}

export default profile;