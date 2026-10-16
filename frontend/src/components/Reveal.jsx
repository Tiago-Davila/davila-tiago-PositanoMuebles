import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Revela su contenido al entrar en pantalla (ScrollTrigger).
 * Los hijos directos se animan en cascada. Sin JS o con reduced-motion,
 * el contenido es visible igual.
 */
export default function Reveal({ children, etiqueta: Etiqueta = "div", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hijos = Array.from(nodo.children);
    const animacion = gsap.fromTo(
      hijos,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: nodo,
          start: "top 82%",
          once: true,
        },
      },
    );
    return () => {
      animacion.scrollTrigger?.kill();
      animacion.kill();
    };
  }, []);

  return (
    <Etiqueta ref={ref} className={className}>
      {children}
    </Etiqueta>
  );
}
