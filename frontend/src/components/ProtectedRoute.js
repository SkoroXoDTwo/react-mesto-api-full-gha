import { Navigate } from "react-router-dom";

function ProtectedRoute({Component, isLoggedIn, ...props}) {
  return isLoggedIn  ? <Component {...props} /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
