import { Navigate, useRoutes } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Tasks from "../pages/tasks/index";
import Sources from "../pages/sources/index";
import Listings from "../pages/sources/listings";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        { path: "/", element: <Navigate to="/sources" /> },
        { path: "sources", element: <Sources /> },
        { path: "sources/listings/:source_id", element: <Listings /> },
        { path: "tasks", element: <Tasks /> },
      ],
    },
    { path: "*", element: <Navigate to="/sources" replace /> },
  ]);
}
