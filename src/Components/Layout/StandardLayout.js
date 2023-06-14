import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";

// This layout is used for all pages except sign in, sign up
export default function StandardLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
}
