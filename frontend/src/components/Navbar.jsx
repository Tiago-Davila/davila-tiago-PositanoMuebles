import { NavLink } from "react-router-dom";
import "./Navbar.css";

const enlaces = [
  { to: "/", texto: "Inicio" },
  { to: "/catalogo", texto: "Catálogo" },
  { to: "/admin", texto: "Admin" },
];

/**
 * Barra de navegación flotante tipo píldora, fija abajo (decisión del boceto:
 * no compite con el video del hero y sigue funcional durante el scroll).
 */
export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      <NavLink to="/" className="navbar__marca">
        Positano
      </NavLink>
      <ul className="navbar__links">
        {enlaces.map((enlace) => (
          <li key={enlace.to}>
            <NavLink
              to={enlace.to}
              end={enlace.to === "/"}
              className={({ isActive }) =>
                `navbar__link${isActive ? " navbar__link--activo" : ""}`
              }
            >
              {enlace.texto}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
