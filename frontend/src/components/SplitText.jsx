import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./SplitText.css";

/**
 * Animación de texto por palabras con GSAP (estilo React Bits SplitText).
 * Respeta prefers-reduced-motion: en ese caso el texto aparece sin animación.
 */
export default function SplitText({ texto, etiqueta: Etiqueta = "h1", className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const palabras = nodo.querySelectorAll(".split-text__palabra");
    const animacion = gsap.fromTo(
      palabras,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        delay,
      },
    );
    return () => animacion.kill();
  }, [delay]);

  return (
    <Etiqueta ref={ref} className={`split-text ${className}`} aria-label={texto}>
      {texto.split(" ").map((palabra, i) => (
        <span key={i} className="split-text__mascara" aria-hidden="true">
          <span className="split-text__palabra">{palabra}</span>
        </span>
      ))}
    </Etiqueta>
  );
}
