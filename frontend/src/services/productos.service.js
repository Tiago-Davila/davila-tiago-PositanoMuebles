const API_URL = "http://localhost:3000/api/productos";

/**
 * Procesa la respuesta del backend.
 * El backend responde { success, data } en éxito y { success, message } en error.
 */
async function procesarRespuesta(response) {
  let cuerpo;
  try {
    cuerpo = await response.json();
  } catch {
    throw new Error("El servidor devolvió una respuesta inválida.");
  }

  if (!response.ok || !cuerpo.success) {
    throw new Error(cuerpo.message || "Ocurrió un error inesperado.");
  }
  return cuerpo.data;
}

async function pedir(url, opciones) {
  let response;
  try {
    response = await fetch(url, opciones);
  } catch {
    throw new Error("No se pudo conectar con el servidor. Verificá que el backend esté corriendo.");
  }
  return procesarRespuesta(response);
}

export function getProductos() {
  return pedir(API_URL);
}

export function getProducto(id) {
  return pedir(`${API_URL}/${id}`);
}

export function crearProducto(producto) {
  return pedir(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
}

export function actualizarProducto(id, producto) {
  return pedir(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
}

export function eliminarProducto(id) {
  return pedir(`${API_URL}/${id}`, { method: "DELETE" });
}
