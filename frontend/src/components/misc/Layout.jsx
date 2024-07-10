import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div>
      <Navbar isHomePage={isHomePage} />
      <main>
        <Outlet />
      </main>
      <Footer isHomePage={isHomePage} />
    </div>
  );
};

export default Layout;
