import { useSelector } from "react-redux";

// requiredRoles: array of roles that are allowed to access the component
export default function AuthorizedComponent({
  children,
  requiredRoles = null,
}) {
  const { loggedIn, role } = useSelector((state) => state.user);

  if (!requiredRoles && loggedIn) return children; // Role not specified and user logged in

  if (requiredRoles && requiredRoles.includes(role)) return children; // Role specified and user has that role

  return "";
}
