import "./Footer.css";

/**
 * Footer en 3 columnas: local, contacto y redes (según el boceto).
 */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer__columnas">
        <section aria-labelledby="footer-local">
          <h2 id="footer-local" className="footer__titulo">
            El local
          </h2>
          <p>Av. del Libertador 4280, Buenos Aires</p>
          <p>Lunes a sábados, 10 a 19 h</p>
          <p>Showroom con atención personalizada</p>
        </section>

        <section aria-labelledby="footer-contacto">
          <h2 id="footer-contacto" className="footer__titulo">
            Contacto
          </h2>
          <p>
            <a href="tel:+541145550123">+54 11 4555-0123</a>
          </p>
          <p>
            <a href="mailto:hola@positanomuebles.com.ar">hola@positanomuebles.com.ar</a>
          </p>
          <p>
            <a href="https://wa.me/5491145550123">WhatsApp</a>
          </p>
        </section>

        <section aria-labelledby="footer-redes">
          <h2 id="footer-redes" className="footer__titulo">
            Redes
          </h2>
          <p>
            <a href="https://instagram.com" rel="noreferrer" target="_blank">
              Instagram
            </a>
          </p>
          <p>
            <a href="https://pinterest.com" rel="noreferrer" target="_blank">
              Pinterest
            </a>
          </p>
          <p>
            <a href="https://facebook.com" rel="noreferrer" target="_blank">
              Facebook
            </a>
          </p>
        </section>
      </div>

      <p className="footer__marca" aria-hidden="true">
        Positano
      </p>
      <p className="footer__legal contenedor">
        © {new Date().getFullYear()} Positano Muebles · Fotos y video: Pexels (uso libre)
      </p>
    </footer>
  );
}
