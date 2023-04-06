import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
      <div className="container-fluid">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              src="/log.svg"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
            />
            TypeWere
          </NavLink>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink
              
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/Tabla"
            >
              Tabla 
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/Arboles"
            >
              Arboles
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/Errores"
            >
              Errores
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};
