import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("admin");
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}