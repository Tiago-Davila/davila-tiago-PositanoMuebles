import { useCallback, useRef, useState } from "react";
import { ToastContext } from "../utils/useToast";
import "./Toast.css";

/**
 * Sistema único de notificaciones laterales.
 * Uso: const { notificar } = useToast(); notificar("Mensaje", "exito" | "error" | "info")
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const cerrar = useCallback((id) => {
    setToasts((lista) => lista.filter((t) => t.id !== id));
  }, []);

  const notificar = useCallback(
    (mensaje, tipo = "info") => {
      const id = ++idRef.current;
      setToasts((lista) => [...lista, { id, mensaje, tipo }]);
      setTimeout(() => cerrar(id), 4500);
    },
    [cerrar],
  );

  return (
    <ToastContext.Provider value={{ notificar }}>
      {children}
      <div className="toast-zona" role="region" aria-label="Notificaciones" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.tipo}`} role="status">
            <p>{toast.mensaje}</p>
            <button
              type="button"
              className="toast__cerrar"
              onClick={() => cerrar(toast.id)}
              aria-label="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
