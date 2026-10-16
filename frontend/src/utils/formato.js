const formateador = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatearPrecio(valor) {
  if (typeof valor !== "number" || Number.isNaN(valor)) return "—";
  return formateador.format(valor);
}
