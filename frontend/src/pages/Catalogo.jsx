import { useEffect, useState } from "react";
import SplitText from "../components/SplitText";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
import Reveal from "../components/Reveal";
import { useToast } from "../components/Toast";
import { getProductos } from "../services/productos.service";
import "./Catalogo.css";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState("todas");
  const { notificar } = useToast();

  const cargar = () => {
    setCargando(true);
    setError(null);
    getProductos()
      .then((lista) => setProductos(lista.filter((p) => p.activo)))
      .catch((e) => {
        setError(e.message);
        notificar(e.message, "error");
      })
      .finally(() => setCargando(false));
  };

  useEffect(cargar, [notificar]);

  const categorias = ["todas", ...new Set(productos.map((p) => p.categoria))];
  const visibles =
    categoria === "todas" ? productos : productos.filter((p) => p.categoria === categoria);

  return (
    <main className="catalogo contenedor">
      <header className="catalogo__cabecera">
        <SplitText texto="El catálogo" className="catalogo__titulo" />
        <p className="catalogo__bajada">
          Todas nuestras piezas en stock, listas para entregar. ¿Buscás algo único? También
          fabricamos a medida.
        </p>
      </header>

      {!cargando && !error && productos.length > 0 && (
        <nav className="catalogo__filtros" aria-label="Filtrar por categoría">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`catalogo__filtro${categoria === cat ? " catalogo__filtro--activo" : ""}`}
              aria-pressed={categoria === cat}
              onClick={() => setCategoria(cat)}
            >
              {cat === "todas" ? "Todas" : cat}
            </button>
          ))}
        </nav>
      )}

      {cargando && <Skeleton cantidad={8} />}

      {!cargando && error && (
        <EmptyState
          titulo="No pudimos cargar el catálogo"
          mensaje={error}
          textoAccion="Reintentar"
          onAccion={cargar}
        />
      )}

      {!cargando && !error && visibles.length === 0 && (
        <EmptyState
          titulo="No hay productos en esta categoría"
          mensaje="Probá con otra categoría o volvé más tarde: renovamos el catálogo todas las semanas."
        />
      )}

      {!cargando && !error && visibles.length > 0 && (
        <Reveal className="catalogo__grid">
          {visibles.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </Reveal>
      )}
    </main>
  );
}
