import React from "react";

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes as RouterRoutes,
} from "react-router-dom";

import { PrivateRoute, ValidateOAuthRoute } from "@/components/auth";
import { Login } from "@/pages/login";
import { Assignors } from "@/pages/dashboard/assignors";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <RouterRoutes>
        <Route
          path="/"
          element={
            <ValidateOAuthRoute>
              <Login />
            </ValidateOAuthRoute>
          }
        />

        <Route
          path="/dashboard/assignors"
          element={
            <PrivateRoute>
              <Assignors />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </Router>
  );
};

export { AppRoutes };
