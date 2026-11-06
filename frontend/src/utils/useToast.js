import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

/** Acceso al sistema de notificaciones: const { notificar } = useToast(); */
export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
  }
  return contexto;
}
