import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";
import { useSelector } from "react-redux";

// This layout is used for all pages except sign in, sign up
export default function StandardLayout() {
  const { fetchCurrentUserLoading } = useSelector((state) => state.user);

  return fetchCurrentUserLoading ? (
    ""
  ) : (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
}
