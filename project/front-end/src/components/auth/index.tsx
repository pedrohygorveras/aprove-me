import React, { useEffect, useRef, useState } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { getUser, setUser } from "@/util/store";

import { authService } from "@/services/auth";

interface iPrivateRoute {
  children: React.ReactNode;
}

interface iValidateOAuthRoute {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<iPrivateRoute> = ({ children }) => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const user = getUser();

  const isMounted = useRef(true);

  useEffect(() => {
    const authenticate = async () => {
      if (!user) {
        if (isMounted.current) {
          setIsAuthenticated(false);
          setIsChecking(false);
        }
      } else {
        const { refreshToken } = user;
        const result = await authService.refresh(refreshToken);

        console.log(result);

        if (isMounted.current) {
          if (result.error) {
            setUser(null);
            setIsAuthenticated(false);
          } else {
            setUser(result);
            setIsAuthenticated(true);
          }
          setIsChecking(false);
        }
      }
    };

    authenticate();

    return () => {
      isMounted.current = false;
    };
  }, [user]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const ValidateOAuthRoute: React.FC<iValidateOAuthRoute> = ({ children }) => {
  const location = useLocation();
  const user = getUser();

  const url = "/dashboard/assignors";

  if (user) {
    return <Navigate to={url} state={{ from: location }} replace />;
  }

  return children;
};

export { PrivateRoute, ValidateOAuthRoute };
