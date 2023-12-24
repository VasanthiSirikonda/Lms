import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authProvider";
import ResponsiveAppBar from "../commonComponents/promoAppBar1";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return (
    <>
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
};
