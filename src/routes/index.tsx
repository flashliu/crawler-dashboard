import { Navigate, useRoutes } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";
import Sources from "../pages/Sources";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <BaseLayout />,
      children: [
        { path: "/", element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "sources", element: <Sources /> },
        { path: "tasks", element: <Tasks /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
