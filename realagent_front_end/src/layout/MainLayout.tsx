import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function MainLayout() {
  return (
    <>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
}
