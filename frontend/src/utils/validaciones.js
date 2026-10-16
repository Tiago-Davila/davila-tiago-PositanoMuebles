/**
 * Valida el formulario de producto.
 * Devuelve un objeto { campo: mensaje } vacío si todo es válido.
 */
export function validarProducto(valores) {
  const errores = {};

  if (!valores.nombre || !valores.nombre.trim()) {
    errores.nombre = "El nombre es obligatorio.";
  } else if (valores.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!valores.descripcion || !valores.descripcion.trim()) {
    errores.descripcion = "La descripción es obligatoria.";
  }

  const precio = Number(valores.precioBase);
  if (valores.precioBase === "" || valores.precioBase === null) {
    errores.precioBase = "El precio es obligatorio.";
  } else if (Number.isNaN(precio) || precio <= 0) {
    errores.precioBase = "El precio debe ser un número mayor a 0.";
  }

  if (!valores.categoria || !valores.categoria.trim()) {
    errores.categoria = "La categoría es obligatoria.";
  }

  return errores;
}
