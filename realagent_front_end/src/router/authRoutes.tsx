import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ErrorScreen, LoginScreen, SignUpScreen } from "../pages";
import { PATH_AUTH } from "./route";
import { MainLayout } from "../layout";
import ForgotPasswordScreen from "../pages/Authentication/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetpasswordScreen from "../pages/Authentication/ForgotPasswordScreen/ResetpasswordScreen";

const AuthRoutes: React.FC = () => {
  const authRoutesElement = useRoutes([
    {
      element: <MainLayout />,
      errorElement: <ErrorScreen />,
      children: [
        {
          path: "/",
          element: <Navigate to={PATH_AUTH.signIn} replace />,
        },
        {
          path: PATH_AUTH.signIn,
          element: <LoginScreen />,
        },
        {
          path: PATH_AUTH.signUp,
          element: <SignUpScreen />,
        },
        {
          path: PATH_AUTH.forgotPassword,
          element: <ForgotPasswordScreen />,
        },
        {
          path: PATH_AUTH.resetPassword,
          element: <ResetpasswordScreen />,
        },
      ],
    },
  ]);

  return <>{authRoutesElement}</>;
};

export default AuthRoutes;
