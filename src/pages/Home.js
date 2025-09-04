import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiquidChrome from '../components/LiquidChrome';
import FillesumeModel from '../components/FillesumeModel';
import Globe from '../components/Globe';
import Model360Viewer from '../components/Model360Viewer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <LiquidChrome
          baseColor="#FFFCF1" // Wewak hex color
          highlightColor="#F6B2B2" // Orchid White hex color
          speed={1}
          amplitude={0.6}
          interactive={true}
        />
        <FillesumeModel />
        <div className="hero-content">
          <p className="hero-subtitle">Diseñamos con la tierra, para la tierra</p>
          <button className="hero-cta">DESCUBRE NUESTRA HISTORIA</button>
        </div>
      </section>

      {/* Embrace Sustainability Section */}
      <section className="embrace-section">
        <div className="container">
          <div className="embrace-content">
            <div className="embrace-text">
              <h2>NUESTRA FILOSOFÍA</h2>
              <p className="body-text">
                En Fillesumé creemos que la innovación en la moda debe ir acompañada de responsabilidad 
                ambiental y visión de futuro. Diseñamos prendas compostables que, tras tu uso, pueden 
                regresar a la tierra como abono.
              </p>
              <p className="body-text">
                Nuestro compromiso es crear moda que no deje residuos, sino que nutra el suelo. 
                La tierra es nuestro punto de partida pero también nuestro destino final.
              </p>
            </div>
            <div className="embrace-image">
              <img src={`${process.env.PUBLIC_URL}/images/red2.jpg`} alt="Nuestra Filosofía" />
            </div>
          </div>
        </div>
      </section>

      {/* Become Part Section */}
      <section className="become-part-section">
        <div className="container">
          <div className="become-part-content">
            <div className="become-part-image">
              <Model360Viewer />
            </div>
            <div className="become-part-text">
              <h2>NUESTRA HISTORIA</h2>
              <p className="body-text">
                Fillesumé nace de la inquietud de repensar el papel de la moda en el contexto actual 
                del planeta: la alteración del clima, la pérdida de naturaleza y biodiversidad, 
                y la contaminación y la generación de residuos.
              </p>
              <p className="body-text">
                Su fundadora, Blanca Sume, biodiseñadora de formación, comenzó desarrollando biomateriales 
                en el laboratorio y posteriormente los aplicó al diseño textil. Cada colección combina 
                investigación matérica con diseño de prendas únicas producidas artesanalmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles Section */}
      <section className="principles-section">
        <div className="container">
          <h2 className="section-title">NUESTROS VALORES</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <h3>REGENERAR</h3>
              <p className="body-text">
                Transformar residuos en materiales útiles, dando una segunda vida a los desechos alimentarios.
              </p>
            </div>
            <div className="principle-card">
              <h3>CIRCULARIDAD</h3>
              <p className="body-text">
                Diseñar prendas que vuelvan a la tierra al final de su vida útil, cerrando el ciclo.
              </p>
            </div>
            <div className="principle-card">
              <h3>INNOVAR</h3>
              <p className="body-text">
                Explorar nuevas soluciones materiales y técnicas de confección en nuestro taller-laboratorio.
              </p>
            </div>
            <div className="principle-card">
              <h3>TRANSPARENCIA</h3>
              <p className="body-text">
                Comunicación clara sobre procesos, materiales y trazabilidad en cada etapa.
              </p>
            </div>
            <div className="principle-card">
              <h3>ARTESANÍA CONTEMPORÁNEA</h3>
              <p className="body-text">
                Procesos manuales y atención al detalle, combinando tradición e innovación.
              </p>
            </div>
            <div className="principle-card">
              <h3>EDUCACIÓN</h3>
              <p className="body-text">
                Talleres, charlas y colaboraciones para compartir conocimiento sobre moda sostenible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Garments Section */}
      <section className="garments-section">
        <div className="container">
          <h2 className="section-title">MATERIALES & PROCESOS CREATIVOS</h2>
          <p className="section-subtitle">La innovación comienza en la materia prima</p>
          <div className="garments-grid">
            <div className="garment-card">
              <div className="garment-image">
                <div className="image-placeholder"></div>
              </div>
              <h3>BIOMATERIALES</h3>
              <p className="body-text">Desarrollados desde cero en nuestro taller-laboratorio</p>
            </div>
            <div className="garment-card">
              <div className="garment-image">
                <div className="image-placeholder"></div>
              </div>
              <h3>HUESO DE ACEITUNA</h3>
              <p className="body-text">Transformamos residuos alimentarios en textiles innovadores</p>
            </div>
            <div className="garment-card">
              <div className="garment-image">
                <div className="image-placeholder"></div>
              </div>
              <h3>COMPOSTABLES</h3>
              <p className="body-text">Garantizamos que puedan regresar a la tierra</p>
            </div>
          </div>
          <button className="section-cta">EXPLORA NUESTRA COLECCIÓN</button>
        </div>
      </section>

      {/* Lifecycle Section */}
      <section className="lifecycle-section">
        <div className="container">
          <Globe />
          <p className="section-subtitle">El ciclo completo de nuestras prendas</p>
          <div className="lifecycle-steps">
            <div className="lifecycle-step">
              <div className="step-number">01</div>
              <h3>INVESTIGAR</h3>
              <p className="body-text">Desarrollamos biomateriales en nuestro taller-laboratorio</p>
            </div>
            <div className="lifecycle-step">
              <div className="step-number">02</div>
              <h3>CREAR</h3>
              <p className="body-text">Confeccionamos artesanalmente con ciencia y diseño</p>
            </div>
            <div className="lifecycle-step">
              <div className="step-number">03</div>
              <h3>USAR</h3>
              <p className="body-text">Disfrutas de prendas únicas y sostenibles</p>
            </div>
            <div className="lifecycle-step">
              <div className="step-number">04</div>
              <h3>COMPOSTAR</h3>
              <p className="body-text">La prenda regresa a la tierra como abono</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-grid">
          <div className="gallery-item large">
            <div className="image-placeholder"></div>
          </div>
          <div className="gallery-item">
            <div className="image-placeholder"></div>
          </div>
          <div className="gallery-item">
            <div className="image-placeholder"></div>
          </div>
          <div className="gallery-item">
            <div className="image-placeholder"></div>
          </div>
          <div className="gallery-item">
            <div className="image-placeholder"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
