import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ErrorScreen, WaitlistScreen } from "../pages";
import { PATH_PUBLIC } from "./route";
import { MainLayout } from "../layout";

const WaitinglistRoutes: React.FC = () => {
  const waitinglistRoutesElement = useRoutes([
    {
      element: <MainLayout />,
      errorElement: <ErrorScreen />,
      children: [
        {
          path: "/",
          element: <Navigate to={PATH_PUBLIC.waitlist} replace />,
        },
        {
          path: PATH_PUBLIC.waitlist,
          element: <WaitlistScreen />,
        },
      ],
    },
  ]);

  return <>{waitinglistRoutesElement}</>;
};

export default WaitinglistRoutes;
