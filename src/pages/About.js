import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiquidChrome from '../components/LiquidChrome';
import MaskedLiquidChrome from '../components/MaskedLiquidChrome';
import Globe from '../components/Globe';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <LiquidChrome
          baseColor="#FFFCF1"
          highlightColor="#F6B2B2"
          speed={0.6}
          amplitude={0.4}
          interactive={false}
        />
        <div className="about-hero-content">
          <h1 className="about-title">NUESTRA HISTORIA</h1>
          <p className="about-subtitle">Redefiniendo la moda hacia un futuro regenerativo</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">NUESTRA MISIÓN</h2>
              <p className="body-text">
                En Fillé Sumé, creemos que la moda puede ser una fuerza regenerativa. 
                Nuestra misión es crear prendas que no solo vistan el cuerpo, sino que 
                nutran la tierra cuando su ciclo de vida termine.
              </p>
              <p className="body-text">
                Cada pieza está diseñada con materiales innovadores como hueso de aceituna 
                y fibras compostables, garantizando que al final de su uso, la prenda 
                regrese a la naturaleza como abono, cerrando el ciclo de manera perfecta.
              </p>
            </div>
            <div className="mission-visual">
              <MaskedLiquidChrome
                maskImage="images/mask-cutouts.png"
                baseColor="#FFFCF1"
                highlightColor="#F6B2B2"
                speed={0.3}
                amplitude={0.6}
                shadowIntensity={0.8}
                shadowCenterX={50}
                shadowCenterY={60}
                shadowWidth={40}
                shadowHeight={70}
                shadowStart={30}
                shadowEnd={50}
                shadowFalloff={25}
                interactive={false}
                style={{ height: '400px', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title centered">NUESTROS VALORES</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3 className="value-title">REGENERATIVO</h3>
              <p className="value-description">
                Cada prenda está diseñada para devolver más de lo que toma, 
                contribuyendo positivamente al ecosistema.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">♻️</div>
              <h3 className="value-title">CIRCULAR</h3>
              <p className="value-description">
                Eliminamos el concepto de desperdicio creando un ciclo 
                cerrado donde todo tiene un propósito.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3 className="value-title">ARTESANAL</h3>
              <p className="value-description">
                Cada pieza es creada con técnicas tradicionales y 
                atención meticulosa al detalle.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔬</div>
              <h3 className="value-title">INNOVADOR</h3>
              <p className="value-description">
                Investigamos y desarrollamos nuevos biomateriales 
                para el futuro de la moda sostenible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="process-content">
            <div className="process-visual">
              <Globe />
            </div>
            <div className="process-text">
              <h2 className="section-title">NUESTRO PROCESO</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h4 className="step-title">INVESTIGACIÓN</h4>
                    <p className="step-description">
                      Estudiamos biomateriales innovadores y técnicas 
                      de producción regenerativas.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h4 className="step-title">DISEÑO</h4>
                    <p className="step-description">
                      Creamos piezas atemporales que trascienden 
                      las tendencias pasajeras.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h4 className="step-title">PRODUCCIÓN</h4>
                    <p className="step-description">
                      Fabricamos cada prenda con técnicas artesanales 
                      y materiales compostables.
                    </p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h4 className="step-title">REGENERACIÓN</h4>
                    <p className="step-description">
                      Al final de su vida útil, la prenda regresa 
                      a la tierra como nutriente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <h2 className="section-title centered">LA HISTORIA DETRÁS DE FILLÉ SUMÉ</h2>
            <div className="story-text">
              <p className="body-text large">
                Fillé Sumé nació de la visión de transformar la industria de la moda 
                desde sus cimientos. Inspirados por la sabiduría ancestral y la 
                innovación científica, creamos una marca que honra tanto la tradición 
                artesanal como el futuro sostenible.
              </p>
              <p className="body-text large">
                Nuestro nombre, que evoca la esencia de hilar y tejer, representa 
                la conexión profunda entre el ser humano, la naturaleza y la creatividad. 
                Cada hilo cuenta una historia de regeneración y esperanza.
              </p>
              <p className="body-text large">
                Trabajamos con comunidades locales, investigadores en biomateriales 
                y artesanos tradicionales para crear piezas que no solo son hermosas, 
                sino que contribuyen activamente a la sanación de nuestro planeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <h2 className="section-title centered">NUESTRO IMPACTO</h2>
          <div className="impact-stats">
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Materiales Compostables</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Residuos Textiles</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">∞</div>
              <div className="stat-label">Ciclos Regenerativos</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">+</div>
              <div className="stat-label">Impacto Positivo</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
