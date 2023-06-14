import { useSelector } from "react-redux";
import LoadingLayer from "../LoadingLayer";

export default function AuthorizedPage({ children, requiredRoles = null }) {
  const { loggedIn, role, fetchCurrentUserLoading } = useSelector(
    (state) => state.user
  );

  if (fetchCurrentUserLoading) {
    return <LoadingLayer />;
  }

  if (
    (!requiredRoles && loggedIn) ||
    (requiredRoles && requiredRoles.includes(role))
  ) {
    return children;
  }

  return (
    <div className="container-fluid d-flex">
      <h4>You are not allowed to view this page!</h4>
    </div>
  );
}
