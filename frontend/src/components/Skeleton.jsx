import "./Skeleton.css";

/**
 * Esqueleto de carga con forma de tarjeta de producto.
 */
export default function Skeleton({ cantidad = 4 }) {
  return (
    <div className="skeleton-grid" role="status" aria-label="Cargando productos">
      {Array.from({ length: cantidad }, (_, i) => (
        <div key={i} className="skeleton-card" aria-hidden="true">
          <div className="skeleton-card__media" />
          <div className="skeleton-card__linea skeleton-card__linea--ancha" />
          <div className="skeleton-card__linea" />
        </div>
      ))}
      <span className="visually-hidden">Cargando…</span>
    </div>
  );
}
