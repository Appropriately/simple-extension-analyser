import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand bg-body-tertiary mb-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Simple Extension Analyser
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
