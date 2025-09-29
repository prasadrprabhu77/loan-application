import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If not logged in → go to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Else → render the protected component
  return children;
};

export default PrivateRoute;
