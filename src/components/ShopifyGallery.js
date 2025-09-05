import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopifyGallery.css';

const ShopifyGallery = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Shopify store details
  const SHOPIFY_DOMAIN = 't4xyer-a0.myshopify.com';
  const STOREFRONT_ACCESS_TOKEN = '53ccb4131ef3725ef749e97a6c2a242f';
  
  const fetchProducts = useCallback(async () => {
    const query = `
      {
        products(first: 6) {
          edges {
            node {
              id
              title
              description
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
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
      
      if (data.data && data.data.products) {
        const formattedProducts = data.data.products.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.title,
          description: edge.node.description,
          handle: edge.node.handle,
          price: edge.node.priceRange.minVariantPrice.amount,
          currency: edge.node.priceRange.minVariantPrice.currencyCode,
          image: edge.node.images.edges[0]?.node.url || '',
          imageAlt: edge.node.images.edges[0]?.node.altText || edge.node.title,
        }));
        setProducts(formattedProducts);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch products from Shopify Storefront API
    fetchProducts();
  }, [fetchProducts]);

  const getDemoProducts = () => {
    // Demo products for development/testing
    return [
      {
        id: '1',
        title: 'Vestido Tierra',
        description: 'Vestido compostable de hueso de aceituna',
        handle: 'vestido-tierra',
        price: '280.00',
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset.jpg`,
        imageAlt: 'Vestido Tierra'
      },
      {
        id: '2',
        title: 'Chaqueta Natura',
        description: 'Chaqueta biodegradable con fibras naturales',
        handle: 'chaqueta-natura',
        price: '350.00',
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset2.jpg`,
        imageAlt: 'Chaqueta Natura'
      },
      {
        id: '3',
        title: 'Falda Circular',
        description: 'Falda de biomateriales innovadores',
        handle: 'falda-circular',
        price: '220.00',
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/red2.jpg`,
        imageAlt: 'Falda Circular'
      },
      {
        id: '4',
        title: 'Top Regenera',
        description: 'Top compostable con diseño minimalista',
        handle: 'top-regenera',
        price: '180.00',
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/red.jpg`,
        imageAlt: 'Top Regenera'
      },
      {
        id: '5',
        title: 'Pantalón Ciclo',
        description: 'Pantalón de fibras recicladas',
        handle: 'pantalon-ciclo',
        price: '290.00',
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset3.jpg`,
        imageAlt: 'Pantalón Ciclo'
      },
      {
        id: '6',
        title: 'Camisa Raíz',
        description: 'Camisa artesanal biodegradable',
        handle: 'camisa-raiz',
        price: '240.00',
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset4.jpg`,
        imageAlt: 'Camisa Raíz'
      }
    ];
  };

  const handleProductClick = (productId) => {
    // Navigate to internal product page instead of external Shopify
    const numericId = productId.replace('gid://shopify/Product/', '');
    navigate(`/product/${numericId}`);
  };

  if (loading) {
    return (
      <section className="shopify-gallery-section">
        <div className="container">
          <div className="loading-spinner">Cargando productos...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="shopify-gallery-section">
      <div className="container">
        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.imageAlt}
                  className="product-image"
                />
                <div className="product-overlay">
                  <span className="view-product">Ver Producto</span>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                  {product.currency === 'EUR' ? '€' : product.currency} {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopifyGallery;
