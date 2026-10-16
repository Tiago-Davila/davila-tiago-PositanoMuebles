import "./Button.css";

/**
 * Botón reutilizable.
 * variante: "primario" (terracota, para CTAs) | "secundario" | "peligro" | "fantasma"
 */
export default function Button({
  children,
  variante = "primario",
  cargando = false,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`boton boton--${variante}`}
      disabled={cargando || props.disabled}
      {...props}
    >
      {cargando && <span className="boton__spinner" aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}
