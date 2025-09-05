import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Shopify store details
  const SHOPIFY_DOMAIN = 't4xyer-a0.myshopify.com';
  const STOREFRONT_ACCESS_TOKEN = '53ccb4131ef3725ef749e97a6c2a242f';

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const fetchProduct = useCallback(async () => {
    const query = `
      {
        product(id: "gid://shopify/Product/${id}") {
          id
          title
          description
          handle
          vendor
          productType
          tags
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.data && data.data.product) {
        const productData = data.data.product;
        setProduct(productData);
        // Set first available variant as default
        if (productData.variants.edges.length > 0) {
          setSelectedVariant(productData.variants.edges[0].node);
        }
      } else {
        // Product not found, redirect to shop
        navigate('/shop');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
      navigate('/shop');
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    // Create cart item
    const cartItem = {
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variant: selectedVariant.title,
      price: selectedVariant.price.amount,
      currency: selectedVariant.price.currencyCode,
      quantity: quantity,
      image: product.images.edges[0]?.node.url || '',
      handle: product.handle
    };

    // Use the cart hook to add item
    addToCart(cartItem);
    
    // Navigate to cart
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="product-loading">
          <div className="container">
            <div className="loading-text">Cargando producto...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page">
        <Navbar />
        <div className="product-not-found">
          <div className="container">
            <h1>Producto no encontrado</h1>
            <button onClick={() => navigate('/shop')} className="back-to-shop">
              Volver a la tienda
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-page">
      <Navbar />
      
      <div className="product-content">
        <div className="container">
          <div className="product-layout">
            {/* Product Images */}
            <div className="product-images">
              {product.images.edges.length > 0 ? (
                <div className="main-image">
                  <img 
                    src={product.images.edges[0].node.url} 
                    alt={product.images.edges[0].node.altText || product.title}
                  />
                </div>
              ) : (
                <div className="no-image">Sin imagen disponible</div>
              )}
              
              {product.images.edges.length > 1 && (
                <div className="image-thumbnails">
                  {product.images.edges.slice(1).map((image, index) => (
                    <img 
                      key={image.node.id}
                      src={image.node.url}
                      alt={image.node.altText || `${product.title} ${index + 2}`}
                      className="thumbnail"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <h1 className="product-title">{product.title}</h1>
              
              <div className="product-price">
                {product.priceRange.minVariantPrice.currencyCode === 'EUR' ? '€' : product.priceRange.minVariantPrice.currencyCode} 
                {product.priceRange.minVariantPrice.amount}
                {product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount && 
                  ` - €${product.priceRange.maxVariantPrice.amount}`
                }
              </div>

              {product.description && (
                <div className="product-description">
                  <p>{product.description}</p>
                </div>
              )}

              {/* Variants */}
              {product.variants.edges.length > 1 && (
                <div className="product-variants">
                  <label>Variante:</label>
                  <select 
                    value={selectedVariant?.id || ''} 
                    onChange={(e) => {
                      const variant = product.variants.edges.find(v => v.node.id === e.target.value);
                      setSelectedVariant(variant?.node);
                    }}
                  >
                    {product.variants.edges.map((variant) => (
                      <option key={variant.node.id} value={variant.node.id}>
                        {variant.node.title} - €{variant.node.price.amount}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity */}
              <div className="quantity-selector">
                <label>Cantidad:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                {selectedVariant?.availableForSale ? 'Añadir al Carrito' : 'No Disponible'}
              </button>

              {/* Product Details */}
              {(product.vendor || product.productType || product.tags.length > 0) && (
                <div className="product-details">
                  {product.vendor && <p><strong>Marca:</strong> {product.vendor}</p>}
                  {product.productType && <p><strong>Tipo:</strong> {product.productType}</p>}
                  {product.tags.length > 0 && (
                    <p><strong>Etiquetas:</strong> {product.tags.join(', ')}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
