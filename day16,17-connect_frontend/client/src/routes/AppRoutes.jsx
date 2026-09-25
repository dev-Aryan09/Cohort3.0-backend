import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../modules/auth/pages/Register.jsx";
import Profile from "../modules/auth/pages/Profile.jsx";

const AppRoutes = () => {
  const router = createBrowserRouter([
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
