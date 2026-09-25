import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../modules/auth/pages/Register";
import Profile from "../modules/auth/pages/Profile";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
