import { formatearPrecio } from "../utils/formato";
import { imagenDeProducto } from "../utils/imagenes";
import "./ProductCard.css";

/**
 * Tarjeta de producto reutilizada en Destacados (Home) y en el Catálogo.
 */
export default function ProductCard({ producto }) {
  return (
    <article className="producto-card">
      <div className="producto-card__media">
        <img
          src={imagenDeProducto(producto)}
          alt={`${producto.nombre}: ${producto.descripcion}`}
          loading="lazy"
        />
      </div>
      <div className="producto-card__info">
        <h3 className="producto-card__nombre">{producto.nombre}</h3>
        <p className="producto-card__descripcion">{producto.descripcion}</p>
        <p className="producto-card__precio">{formatearPrecio(producto.precioBase)}</p>
      </div>
    </article>
  );
}
