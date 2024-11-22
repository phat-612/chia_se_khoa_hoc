import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import MeLayout from "./layouts/MeLayout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import MyCourses from "./pages/MyCourses";
import Course from "./pages/Course";
import DetailCourses from "./pages/DetailCourses";
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
    path: "/courses",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Course />,
      },
      {
        path: ":idCourses",
        element: <DetailCourses />,
      },
    ],
  },
  {
    path: "/me",
    element: (
      <PrivateRoute>
        <MeLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
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
