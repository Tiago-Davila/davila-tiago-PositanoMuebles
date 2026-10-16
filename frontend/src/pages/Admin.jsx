import { useEffect, useState } from "react";
import Button from "../components/Button";
import Field from "../components/Field";
import ConfirmDialog from "../components/ConfirmDialog";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
import { useToast } from "../components/Toast";
import { formatearPrecio } from "../utils/formato";
import { validarProducto } from "../utils/validaciones";
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productos.service";
import "./Admin.css";

const formularioVacio = {
  nombre: "",
  descripcion: "",
  precioBase: "",
  categoria: "",
  activo: true,
};

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [valores, setValores] = useState(formularioVacio);
  const [errores, setErrores] = useState({});
  const [editando, setEditando] = useState(null); // producto en edición o null
  const [guardando, setGuardando] = useState(false);

  const [aEliminar, setAEliminar] = useState(null); // producto a confirmar eliminación
  const [eliminando, setEliminando] = useState(false);

  const { notificar } = useToast();

  const cargar = () => {
    setCargando(true);
    setErrorCarga(null);
    getProductos()
      .then(setProductos)
      .catch((e) => {
        setErrorCarga(e.message);
        notificar(e.message, "error");
      })
      .finally(() => setCargando(false));
  };

  useEffect(cargar, [notificar]);

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setValores((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
  };

  const empezarEdicion = (producto) => {
    setEditando(producto);
    setErrores({});
    setValores({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precioBase: String(producto.precioBase),
      categoria: producto.categoria,
      activo: producto.activo,
    });
    document.getElementById("admin-formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setValores(formularioVacio);
    setErrores({});
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevosErrores = validarProducto(valores);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      notificar("Revisá los campos marcados del formulario.", "error");
      return;
    }

    const producto = {
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion.trim(),
      precioBase: Number(valores.precioBase),
      categoria: valores.categoria.trim(),
      activo: valores.activo,
    };

    setGuardando(true);
    try {
      if (editando) {
        const actualizado = await actualizarProducto(editando.id, producto);
        setProductos((lista) => lista.map((p) => (p.id === actualizado.id ? actualizado : p)));
        notificar(`"${actualizado.nombre}" se actualizó correctamente.`, "exito");
      } else {
        const creado = await crearProducto(producto);
        setProductos((lista) => [...lista, creado]);
        notificar(`"${creado.nombre}" se creó correctamente.`, "exito");
      }
      cancelarEdicion();
    } catch (error) {
      notificar(error.message, "error");
    } finally {
      setGuardando(false);
    }
  };

  const confirmarEliminacion = async () => {
    if (!aEliminar) return;
    setEliminando(true);
    try {
      await eliminarProducto(aEliminar.id);
      setProductos((lista) => lista.filter((p) => p.id !== aEliminar.id));
      notificar(`"${aEliminar.nombre}" se eliminó correctamente.`, "exito");
      if (editando?.id === aEliminar.id) cancelarEdicion();
      setAEliminar(null);
    } catch (error) {
      notificar(error.message, "error");
    } finally {
      setEliminando(false);
    }
  };

  return (
    <main className="admin contenedor">
      <header className="admin__cabecera">
        <h1 className="admin__titulo">Administración</h1>
        <p className="admin__bajada">
          Gestioná el catálogo: creá, modificá o eliminá productos. Los cambios impactan al
          instante en la tienda.
        </p>
      </header>

      <div className="admin__paneles">
        {/* Formulario alta / edición */}
        <section
          id="admin-formulario"
          className="admin__formulario"
          aria-labelledby="titulo-formulario"
        >
          <h2 id="titulo-formulario" className="admin__subtitulo">
            {editando ? `Editar "${editando.nombre}"` : "Nuevo producto"}
          </h2>
          <form onSubmit={manejarEnvio} noValidate>
            <Field
              id="nombre"
              label="Nombre"
              value={valores.nombre}
              onChange={manejarCambio}
              error={errores.nombre}
              placeholder="Ej.: Sillón Recoleta"
              required
            />
            <Field
              id="descripcion"
              label="Descripción"
              tipo="textarea"
              value={valores.descripcion}
              onChange={manejarCambio}
              error={errores.descripcion}
              placeholder="Materiales, medidas, detalles…"
              required
            />
            <div className="admin__fila">
              <Field
                id="precioBase"
                label="Precio base (ARS)"
                tipo="number"
                min="1"
                step="any"
                value={valores.precioBase}
                onChange={manejarCambio}
                error={errores.precioBase}
                placeholder="185000"
                required
              />
              <Field
                id="categoria"
                label="Categoría"
                value={valores.categoria}
                onChange={manejarCambio}
                error={errores.categoria}
                placeholder="Ej.: Sillones"
                required
              />
            </div>
            <div className="admin__activo">
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={valores.activo}
                onChange={manejarCambio}
              />
              <label htmlFor="activo">Visible en la tienda</label>
            </div>
            <div className="admin__acciones">
              {editando && (
                <Button variante="fantasma" onClick={cancelarEdicion} disabled={guardando}>
                  Cancelar
                </Button>
              )}
              <Button type="submit" cargando={guardando}>
                {editando ? "Guardar cambios" : "Crear producto"}
              </Button>
            </div>
          </form>
        </section>

        {/* Listado */}
        <section className="admin__listado" aria-labelledby="titulo-listado">
          <h2 id="titulo-listado" className="admin__subtitulo">
            Productos ({productos.length})
          </h2>

          {cargando && <Skeleton cantidad={2} />}

          {!cargando && errorCarga && (
            <EmptyState
              titulo="No pudimos cargar los productos"
              mensaje={errorCarga}
              textoAccion="Reintentar"
              onAccion={cargar}
            />
          )}

          {!cargando && !errorCarga && productos.length === 0 && (
            <EmptyState
              titulo="El catálogo está vacío"
              mensaje="Creá tu primer producto con el formulario."
            />
          )}

          {!cargando && !errorCarga && productos.length > 0 && (
            <ul className="admin__lista">
              {productos.map((producto) => (
                <li key={producto.id} className="admin__item">
                  <div className="admin__item-info">
                    <h3>{producto.nombre}</h3>
                    <p className="admin__item-meta">
                      {producto.categoria} · {formatearPrecio(producto.precioBase)} ·{" "}
                      <span
                        className={
                          producto.activo ? "admin__estado--activo" : "admin__estado--inactivo"
                        }
                      >
                        {producto.activo ? "Visible" : "Oculto"}
                      </span>
                    </p>
                    <p className="admin__item-descripcion">{producto.descripcion}</p>
                  </div>
                  <div className="admin__item-acciones">
                    <Button variante="secundario" onClick={() => empezarEdicion(producto)}>
                      Editar
                    </Button>
                    <Button variante="peligro" onClick={() => setAEliminar(producto)}>
                      Eliminar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <ConfirmDialog
        abierto={Boolean(aEliminar)}
        titulo="¿Eliminar producto?"
        mensaje={
          aEliminar
            ? `"${aEliminar.nombre}" se eliminará del catálogo de forma permanente. Esta acción no se puede deshacer.`
            : ""
        }
        cargando={eliminando}
        onConfirmar={confirmarEliminacion}
        onCancelar={() => setAEliminar(null)}
      />
    </main>
  );
}
