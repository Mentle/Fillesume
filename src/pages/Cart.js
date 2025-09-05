import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import './Cart.css';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem, getTotalItems, clearCart } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);

    // Create checkout URL with Shopify
    const SHOPIFY_DOMAIN = 't4xyer-a0.myshopify.com';
    const STOREFRONT_ACCESS_TOKEN = '53ccb4131ef3725ef749e97a6c2a242f';

    const checkoutMutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            field
            message
          }
        }
      }
    `;

    const lineItems = cartItems.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity
    }));

    const variables = {
      input: {
        lineItems: lineItems
      }
    };

    try {
      const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: checkoutMutation,
          variables: variables
        }),
      });

      const data = await response.json();

      if (data.data?.checkoutCreate?.checkout?.webUrl) {
        // Clear cart after successful checkout creation
        clearCart();
        // Redirect to Shopify checkout
        window.location.href = data.data.checkoutCreate.checkout.webUrl;
      } else {
        console.error('Checkout creation failed:', data.data?.checkoutCreate?.checkoutUserErrors);
        alert('Error al crear el checkout. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Error al procesar el checkout. Por favor, inténtalo de nuevo.');
    }

    setLoading(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="empty-cart">
          <div className="container">
            <h1>Tu Carrito</h1>
            <p>Tu carrito está vacío</p>
            <button onClick={() => navigate('/shop')} className="continue-shopping">
              Continuar Comprando
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Navbar />
      
      <div className="cart-content">
        <div className="container">
          <h1 className="cart-title">Tu Carrito ({getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'})</h1>
          
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.variantId} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    {item.variant !== 'Default Title' && (
                      <p className="item-variant">{item.variant}</p>
                    )}
                    <p className="item-price">
                      {item.currency === 'EUR' ? '€' : item.currency} {item.price}
                    </p>
                  </div>
                  
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.variantId)}
                      className="remove-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                  
                  <div className="item-total">
                    €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Resumen del Pedido</h2>
              
              <div className="summary-line">
                <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'})</span>
                <span>€{getTotalPrice()}</span>
              </div>
              
              <div className="summary-line total">
                <span>Total</span>
                <span>€{getTotalPrice()}</span>
              </div>
              
              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="checkout-btn"
              >
                {loading ? 'Procesando...' : 'Finalizar Compra'}
              </button>
              
              <button 
                onClick={() => navigate('/shop')}
                className="continue-shopping-btn"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
