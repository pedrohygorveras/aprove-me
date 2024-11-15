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
import { Payables } from "@/pages/dashboard/payables";
import { Batches } from "@/pages/dashboard/batches";
import { Users } from "@/pages/dashboard/users";
import { DeadLetterQueues } from "@/pages/dashboard/dead-letter-queue";
import { AssignorCreateOrUpdate } from "@/pages/dashboard/assignors/create_update";
import { PayableCreateOrUpdate } from "@/pages/dashboard/payables/create_update";
import { UserCreateOrUpdate } from "@/pages/dashboard/users/create_update";

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
        <Route
          path="/dashboard/assignors/add"
          element={
            <PrivateRoute>
              <AssignorCreateOrUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/assignors/add/:id"
          element={
            <PrivateRoute>
              <AssignorCreateOrUpdate />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/payables"
          element={
            <PrivateRoute>
              <Payables />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/payables/add"
          element={
            <PrivateRoute>
              <PayableCreateOrUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/payables/add/:id"
          element={
            <PrivateRoute>
              <PayableCreateOrUpdate />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/batches"
          element={
            <PrivateRoute>
              <Batches />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/dead-letter-queue"
          element={
            <PrivateRoute>
              <DeadLetterQueues />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/users/add"
          element={
            <PrivateRoute>
              <UserCreateOrUpdate />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/users/add/:id"
          element={
            <PrivateRoute>
              <UserCreateOrUpdate />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </RouterRoutes>
    </Router>
  );
};

export { AppRoutes };
