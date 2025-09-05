import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MaskedLiquidChrome from '../components/MaskedLiquidChrome';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Navbar />
      

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2 className="section-title">ENVÍANOS UN MENSAJE</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Nombre *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Asunto *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Selecciona un tema</option>
                    <option value="general">Consulta General</option>
                    <option value="products">Información de Productos</option>
                    <option value="sustainability">Sostenibilidad</option>
                    <option value="collaboration">Colaboración</option>
                    <option value="press">Prensa</option>
                    <option value="wholesale">Ventas al Mayor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows="6"
                  ></textarea>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="form-message success">
                    ¡Gracias por tu mensaje! Te responderemos pronto.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="form-message error">
                    Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <div className="contact-visual">
                <MaskedLiquidChrome
                  maskImage="images/mask-cutouts.png"
                  baseColor="#FFFCF1"
                  highlightColor="#F6B2B2"
                  speed={0.2}
                  amplitude={0.8}
                  shadowIntensity={0.6}
                  shadowCenterX={50}
                  shadowCenterY={50}
                  shadowWidth={60}
                  shadowHeight={60}
                  shadowStart={40}
                  shadowEnd={60}
                  shadowFalloff={20}
                  interactive={false}
                  style={{ height: '300px', borderRadius: '12px', marginBottom: '40px' }}
                />
              </div>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h3 className="contact-item-title">UBICACIÓN</h3>
                  <p className="contact-item-text">
                    Barcelona, España<br />
                    Atelier de Diseño Sostenible
                  </p>
                </div>
                
                <div className="contact-item">
                  <h3 className="contact-item-title">EMAIL</h3>
                  <p className="contact-item-text">
                    <a href="mailto:hola@fillesume.com" className="contact-link">
                      hola@fillesume.com
                    </a>
                  </p>
                </div>
                
                <div className="contact-item">
                  <h3 className="contact-item-title">PRENSA</h3>
                  <p className="contact-item-text">
                    <a href="mailto:prensa@fillesume.com" className="contact-link">
                      prensa@fillesume.com
                    </a>
                  </p>
                </div>
                
                <div className="contact-item">
                  <h3 className="contact-item-title">COLABORACIONES</h3>
                  <p className="contact-item-text">
                    <a href="mailto:colaboraciones@fillesume.com" className="contact-link">
                      colaboraciones@fillesume.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="social-links">
                <h3 className="contact-item-title">SÍGUENOS</h3>
                <div className="social-icons">
                  <button className="social-link" aria-label="Instagram" onClick={() => window.open('https://instagram.com', '_blank')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </button>
                  <button className="social-link" aria-label="LinkedIn" onClick={() => window.open('https://linkedin.com', '_blank')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button className="social-link" aria-label="Twitter" onClick={() => window.open('https://twitter.com', '_blank')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="additional-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3 className="info-title">HORARIOS DE ATENCIÓN</h3>
              <p className="info-text">
                Lunes a Viernes: 9:00 - 18:00<br />
                Sábados: 10:00 - 14:00<br />
                Domingos: Cerrado
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-title">TIEMPO DE RESPUESTA</h3>
              <p className="info-text">
                Consultas generales: 24-48 horas<br />
                Colaboraciones: 3-5 días laborables<br />
                Prensa: 24 horas
              </p>
            </div>
            <div className="info-card">
              <h3 className="info-title">VISITAS AL ATELIER</h3>
              <p className="info-text">
                Citas disponibles con reserva previa<br />
                Experiencias de diseño personalizadas<br />
                Tours de sostenibilidad
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
