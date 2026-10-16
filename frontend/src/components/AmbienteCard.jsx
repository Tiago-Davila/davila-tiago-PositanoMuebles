import { Link } from "react-router-dom";
import "./AmbienteCard.css";

/**
 * Tarjeta de ambiente (living, comedor, dormitorio) con overlay en hover/foco.
 */
export default function AmbienteCard({ imagen, nombre, descripcion }) {
  return (
    <Link
      to={`/catalogo?ambiente=${encodeURIComponent(nombre.toLowerCase())}`}
      className="ambiente-card"
    >
      <img src={imagen} alt={`Ambiente ${nombre}: ${descripcion}`} loading="lazy" />
      <div className="ambiente-card__overlay">
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <span className="ambiente-card__cta">Ver más →</span>
      </div>
    </Link>
  );
}
