import { useSelector } from "react-redux";

export default function AuthorizedPage({ children, requiredRoles = null }) {
  const { loggedIn, role } = useSelector((state) => state.user);

  if (!requiredRoles && loggedIn) return children; // Role not specified and user logged in

  if (requiredRoles && requiredRoles.includes(role)) return children; // Role specified and user has that role

  return window.location.replace("/"); // Redirect to home page
}
