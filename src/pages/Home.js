import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiquidChrome from '../components/LiquidChrome';
import FillesumeModel from '../components/FillesumeModel';
import Globe from '../components/Globe';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <LiquidChrome
          baseColor={[0.95, 0.7, 0.7]} // Wewak color in RGB (0-1 range)
          speed={1}
          amplitude={0.6}
          interactive={true}
        />
        <FillesumeModel />
        <div className="hero-content">
          <p className="hero-subtitle">Pioneering compostable clothing through regenerative biomaterials</p>
          <button className="hero-cta">DISCOVER OUR STORY</button>
        </div>
      </section>

      {/* Embrace Sustainability Section */}
      <section className="embrace-section">
        <div className="container">
          <div className="embrace-content">
            <div className="embrace-text">
              <h2>EMBRACE SUSTAINABILITY</h2>
              <p className="body-text">
                At Fillesumé, we're redefining fashion through innovation and responsibility. 
                Our garments are crafted from regenerative biomaterials that not only look 
                beautiful but also return safely to the earth at the end of their lifecycle.
              </p>
              <p className="body-text">
                Join us in creating a circular fashion future where style meets sustainability, 
                and every piece tells a story of environmental consciousness.
              </p>
            </div>
            <div className="embrace-image">
              {/* Placeholder for image */}
              <div className="image-placeholder"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Become Part Section */}
      <section className="become-part-section">
        <div className="container">
          <div className="become-part-content">
            <div className="become-part-image">
              {/* Placeholder for image */}
              <div className="image-placeholder"></div>
            </div>
            <div className="become-part-text">
              <h2>BECOME PART OF THE CHANGE</h2>
              <p className="body-text">
                Every Fillesumé piece is a statement of intent - a commitment to fashion that 
                respects both people and planet. Our innovative BioTextil process transforms 
                natural materials into luxurious fabrics that biodegrade completely.
              </p>
              <p className="body-text">
                Experience the perfect blend of contemporary design and ecological responsibility. 
                Choose clothing that aligns with your values without compromising on style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles Section */}
      <section className="principles-section">
        <div className="container">
          <h2 className="section-title">OUR PRINCIPLES</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <h3>INNOVATION</h3>
              <p className="body-text">
                Pushing boundaries in sustainable textile development through cutting-edge research.
              </p>
            </div>
            <div className="principle-card">
              <h3>RESPONSIBILITY</h3>
              <p className="body-text">
                Taking accountability for our environmental impact at every stage of production.
              </p>
            </div>
            <div className="principle-card">
              <h3>TRANSPARENCY</h3>
              <p className="body-text">
                Open communication about our processes, materials, and supply chain.
              </p>
            </div>
            <div className="principle-card">
              <h3>CRAFTSMANSHIP</h3>
              <p className="body-text">
                Honoring traditional techniques while embracing modern sustainable practices.
              </p>
            </div>
            <div className="principle-card">
              <h3>EDUCATION</h3>
              <p className="body-text">
                Empowering consumers with knowledge about sustainable fashion choices.
              </p>
            </div>
            <div className="principle-card">
              <h3>CIRCULARITY</h3>
              <p className="body-text">
                Designing for a closed-loop system where nothing goes to waste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Garments Section */}
      <section className="garments-section">
        <div className="container">
          <h2 className="section-title">OUR GARMENTS</h2>
          <p className="section-subtitle">Each piece crafted with purpose and precision</p>
          <div className="garments-grid">
            <div className="garment-card">
              <div className="garment-image">
                <div className="image-placeholder"></div>
              </div>
              <h3>ESSENTIALS</h3>
              <p className="body-text">Timeless basics reimagined</p>
            </div>
            <div className="garment-card">
              <div className="garment-image">
                <div className="image-placeholder"></div>
              </div>
              <h3>SEASONAL</h3>
              <p className="body-text">Limited collections inspired by nature</p>
            </div>
            <div className="garment-card">
              <div className="garment-image">
                <div className="image-placeholder"></div>
              </div>
              <h3>CUSTOM</h3>
              <p className="body-text">Bespoke pieces tailored to you</p>
            </div>
          </div>
          <button className="section-cta">EXPLORE COLLECTION</button>
        </div>
      </section>

      {/* Lifecycle Section */}
      <section className="lifecycle-section">
        <div className="container">
          <Globe />
          <p className="section-subtitle">The complete lifecycle of our garments</p>
          <div className="lifecycle-steps">
            <div className="lifecycle-step">
              <div className="step-number">01</div>
              <h3>SOURCE</h3>
              <p className="body-text">Regenerative materials from certified suppliers</p>
            </div>
            <div className="lifecycle-step">
              <div className="step-number">02</div>
              <h3>CREATE</h3>
              <p className="body-text">Crafted with care by local artisans</p>
            </div>
            <div className="lifecycle-step">
              <div className="step-number">03</div>
              <h3>WEAR</h3>
              <p className="body-text">Enjoyed and cherished by you</p>
            </div>
            <div className="lifecycle-step">
              <div className="step-number">04</div>
              <h3>RETURN</h3>
              <p className="body-text">Composted to nourish the earth</p>
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
