import { useEffect, useRef } from "react";
import Button from "./Button";
import "./ConfirmDialog.css";

/**
 * Diálogo de confirmación (usado antes de eliminar un registro).
 * Usa <dialog> nativo: foco atrapado y cierre con Escape sin código extra.
 */
export default function ConfirmDialog({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = "Eliminar",
  cargando = false,
  onConfirmar,
  onCancelar,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;
    if (abierto && !dialogo.open) dialogo.showModal();
    if (!abierto && dialogo.open) dialogo.close();
  }, [abierto]);

  return (
    <dialog
      ref={ref}
      className="dialogo"
      onCancel={(e) => {
        e.preventDefault();
        onCancelar();
      }}
      aria-labelledby="dialogo-titulo"
    >
      <h2 id="dialogo-titulo" className="dialogo__titulo">
        {titulo}
      </h2>
      <p className="dialogo__mensaje">{mensaje}</p>
      <div className="dialogo__acciones">
        <Button variante="fantasma" onClick={onCancelar} disabled={cargando}>
          Cancelar
        </Button>
        <Button variante="peligro" onClick={onConfirmar} cargando={cargando}>
          {textoConfirmar}
        </Button>
      </div>
    </dialog>
  );
}
