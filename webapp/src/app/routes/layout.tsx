import { Outlet, Link } from "react-router-dom";
import Icon from "@/components/icon";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand bg-body-tertiary mb-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <div className="d-inline-flex align-items-center">
              <Icon icon="search" className="text-primary me-2" />
            </div>
            Simple Extension Analyser
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
