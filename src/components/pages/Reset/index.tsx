import React from "react";
import { Navigate } from "react-router-dom";

const Reset = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // navigate("/auth/login");
  return <Navigate to={`/auth/login`} replace={true} />;
}

export default Reset;