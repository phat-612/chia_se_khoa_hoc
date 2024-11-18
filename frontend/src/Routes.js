import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import MeLayout from "./layouts/MeLayout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyCourses from "./pages/MyCourses";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/me",
    element: (
      // <PrivateRoute>
      //   <MeLayout />
      // </PrivateRoute>
      <MeLayout />
    ),
    children: [
      {
        path: "MyCourses",
        element: <MyCourses />,
      },
    ],
  },
  {
    future: {
      v7_startTransition: true,
    },
  },
]);
function RouterWeb() {
  return <RouterProvider router={routes} />;
}
export default RouterWeb;
