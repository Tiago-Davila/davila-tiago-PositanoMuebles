import "./Field.css";

/**
 * Campo de formulario accesible: label asociado, mensaje de error con aria.
 * tipo "textarea" renderiza un textarea; cualquier otro, un input.
 */
export default function Field({ id, label, error, tipo = "text", ...props }) {
  const errorId = `${id}-error`;
  const comunes = {
    id,
    name: id,
    className: `campo__control${error ? " campo__control--error" : ""}`,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    ...props,
  };

  return (
    <div className="campo">
      <label className="campo__label" htmlFor={id}>
        {label}
      </label>
      {tipo === "textarea" ? (
        <textarea rows={3} {...comunes} />
      ) : (
        <input type={tipo} {...comunes} />
      )}
      {error && (
        <p className="campo__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
