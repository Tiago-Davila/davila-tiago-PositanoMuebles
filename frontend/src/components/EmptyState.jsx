import Button from "./Button";
import "./EmptyState.css";

/**
 * Estado vacío o de error reutilizable, con acción opcional de reintento.
 */
export default function EmptyState({ titulo, mensaje, textoAccion, onAccion }) {
  return (
    <div className="estado-vacio">
      <h3>{titulo}</h3>
      <p>{mensaje}</p>
      {textoAccion && onAccion && (
        <Button variante="secundario" onClick={onAccion}>
          {textoAccion}
        </Button>
      )}
    </div>
  );
}
