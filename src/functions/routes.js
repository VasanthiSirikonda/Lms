import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useAuth } from "../helpers/authProvider";
import { ProtectedRoute } from "../helpers/protectedRoute";

import Login from "../components/login";
import DataTable from "../components/usermanagement";
import BooksTable from "../components/books";

import Registration from "../components/registration";
import { Home } from "../components/home";
import UploadPostmortem from "../components/uplaodPostmortem";
import Authors from "../components/authors";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Navigate to="/home" />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/user-management",
          element: <DataTable />,
        },
        {
          path: "/book-management",
          element: <BooksTable />,
        },

        {
          path: "/authors",
          element: <Authors />,
        },
        {
          path: "*",
          exact: true,
          element: <Navigate to="/home" />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Registration />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ],{basename: "/",});

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
