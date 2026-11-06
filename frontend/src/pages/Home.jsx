import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/SplitText";
import Reveal from "../components/Reveal";
import AmbienteCard from "../components/AmbienteCard";
import ProductCard from "../components/ProductCard";
import Skeleton from "../components/Skeleton";
import EmptyState from "../components/EmptyState";
import { useToast } from "../utils/useToast";
import { getProductos } from "../services/productos.service";
import heroVideo from "../assets/hero-video.mp4";
import heroPoster from "../assets/hero-video-poster.jpg";
import imgLiving from "../assets/ambiente-living.jpg";
import imgComedor from "../assets/ambiente-comedor.jpg";
import imgDormitorio from "../assets/ambiente-dormitorio.jpg";
import "./Home.css";

gsap.registerPlugin(ScrollTrigger);

const ambientes = [
  {
    imagen: imgLiving,
    nombre: "Living",
    descripcion: "Sillones y mesas ratonas para el corazón de la casa.",
  },
  {
    imagen: imgComedor,
    nombre: "Comedor",
    descripcion: "Mesas y sillas que reúnen a la familia.",
  },
  {
    imagen: imgDormitorio,
    nombre: "Dormitorio",
    descripcion: "Roperos y camas pensados para el descanso.",
  },
];

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { notificar } = useToast();
  const heroRef = useRef(null);
  const franjaRef = useRef(null);

  const pedirProductos = useCallback(() => {
    getProductos()
      .then((lista) => setProductos(lista.filter((p) => p.activo).slice(0, 4)))
      .catch((e) => {
        setError(e.message);
        notificar(e.message, "error");
      })
      .finally(() => setCargando(false));
  }, [notificar]);

  // Carga inicial: el estado ya arranca en "cargando".
  useEffect(pedirProductos, [pedirProductos]);

  // Reintento disparado por el usuario.
  const cargarProductos = () => {
    setCargando(true);
    setError(null);
    pedirProductos();
  };

  /* Parallax del video del hero + reveal de la franja de pagos */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero__video", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".franja__item",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.16,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: franjaRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main>
      {/* Hero con video en loop */}
      <section className="hero" ref={heroRef} aria-label="Presentación">
        <video
          className="hero__video"
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__contenido contenedor">
          <SplitText texto="Muebles hechos a tu medida" className="hero__titulo" />
          <p className="hero__bajada">
            Diseño, madera y oficio en el corazón de Buenos Aires. Fabricamos el mueble que tu
            espacio pide.
          </p>
          <Link to="/catalogo" className="hero__cta">
            Cotizá tu mueble
          </Link>
        </div>
      </section>

      {/* Ambientes */}
      <section className="seccion contenedor" aria-labelledby="titulo-ambientes">
        <Reveal>
          <h2 id="titulo-ambientes" className="seccion__titulo">
            Pensá en ambientes, no en muebles sueltos
          </h2>
          <p className="seccion__bajada">
            Armamos espacios completos: elegí el ambiente y descubrí las piezas que lo componen.
          </p>
        </Reveal>
        <Reveal className="ambientes-grid">
          {ambientes.map((ambiente) => (
            <AmbienteCard key={ambiente.nombre} {...ambiente} />
          ))}
        </Reveal>
      </section>

      {/* Destacados: 4 productos reales de la API */}
      <section className="seccion contenedor" aria-labelledby="titulo-destacados">
        <Reveal>
          <h2 id="titulo-destacados" className="seccion__titulo">
            Los elegidos del showroom
          </h2>
          <p className="seccion__bajada">
            Una selección curada de nuestras piezas más pedidas, con precios a la vista.
          </p>
        </Reveal>
        {cargando && <Skeleton cantidad={4} />}
        {!cargando && error && (
          <EmptyState
            titulo="No pudimos cargar los productos"
            mensaje={error}
            textoAccion="Reintentar"
            onAccion={cargarProductos}
          />
        )}
        {!cargando && !error && productos.length === 0 && (
          <EmptyState
            titulo="Todavía no hay productos"
            mensaje="Cargá productos desde el panel de administración para verlos acá."
          />
        )}
        {!cargando && !error && productos.length > 0 && (
          <>
            <div className="destacados-grid">
              {productos.map((producto) => (
                <ProductCard key={producto.id} producto={producto} />
              ))}
            </div>
            <div className="destacados-ver-mas">
              <Link to="/catalogo" className="destacados-link">
                Ver el catálogo completo →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Pagos y envíos: franja con fondo distinto */}
      <section className="franja" ref={franjaRef} aria-labelledby="titulo-pagos">
        <div className="contenedor">
          <h2 id="titulo-pagos" className="franja__titulo">
            Comprar es tan simple como elegir
          </h2>
          <div className="franja__items">
            <div className="franja__item">
              <h3>Hasta 12 cuotas</h3>
              <p>
                Pagá con tarjeta de crédito o débito, transferencia o efectivo en el local. Para
                muebles a medida, señás el 50% y el resto contra entrega.
              </p>
            </div>
            <div className="franja__item">
              <h3>Envío a todo el país</h3>
              <p>
                Entregamos en CABA y GBA con flete propio, e interior por transporte asegurado.
                Coordinamos día y franja horaria con vos.
              </p>
            </div>
            <div className="franja__item">
              <h3>Fabricación a medida</h3>
              <p>
                Diseñamos y fabricamos en nuestro taller en 30 a 45 días. Seguís el estado de tu
                pedido en cada etapa, del boceto a la entrega.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
