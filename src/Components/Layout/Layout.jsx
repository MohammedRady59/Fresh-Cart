import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Nav from "../Navbar/Nav";
import { memo } from "react";

function Layout() {
  return (
    <>
      <Nav />
      <div className="container md:pt-12 ">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}

export default memo(Layout);
