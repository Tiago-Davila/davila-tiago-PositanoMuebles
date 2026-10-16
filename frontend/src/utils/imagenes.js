import imgSillon from "../assets/prod-sillon.jpg";
import imgMesa from "../assets/prod-mesa.jpg";
import imgRopero from "../assets/prod-ropero.jpg";
import imgSilla from "../assets/prod-silla.jpg";

/**
 * Asigna una imagen según la categoría del producto.
 * Las fotos vienen de Pexels (uso libre) y representan el mundo del producto.
 */
const porCategoria = {
  sillones: imgSillon,
  sillon: imgSillon,
  mesas: imgMesa,
  mesa: imgMesa,
  roperos: imgRopero,
  ropero: imgRopero,
  almacenamiento: imgRopero,
  sillas: imgSilla,
  silla: imgSilla,
};

export function imagenDeProducto(producto) {
  const clave = (producto?.categoria || "").toLowerCase().trim();
  return porCategoria[clave] || imgSillon;
}
