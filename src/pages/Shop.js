import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortBy, setSortBy] = useState('title');

  // Shopify store details
  const SHOPIFY_DOMAIN = 't4xyer-a0.myshopify.com';
  const STOREFRONT_ACCESS_TOKEN = '53ccb4131ef3725ef749e97a6c2a242f';

  const fetchProducts = useCallback(async () => {
    const query = `
      {
        products(first: 20) {
          edges {
            node {
              id
              title
              description
              handle
              productType
              tags
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
          productType: edge.node.productType,
          tags: edge.node.tags,
          price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
          currency: edge.node.priceRange.minVariantPrice.currencyCode,
          image: edge.node.images.edges[0]?.node.url || '',
          imageAlt: edge.node.images.edges[0]?.node.altText || edge.node.title,
        }));
        setProducts(formattedProducts);
      } else {
        setProducts(getDemoProducts());
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }, []);

  const filterAndSortProducts = useCallback(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.productType?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });
    
    setFilteredProducts(sorted);
  }, [products, selectedCategory, priceRange, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    filterAndSortProducts();
  }, [filterAndSortProducts]);

  const getDemoProducts = () => {
    return [
      {
        id: '1',
        title: 'Vestido Tierra',
        description: 'Vestido compostable de hueso de aceituna con diseño elegante y sostenible',
        handle: 'vestido-tierra',
        productType: 'Vestidos',
        tags: ['compostable', 'elegante', 'sostenible'],
        price: 280.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset.jpg`,
        imageAlt: 'Vestido Tierra'
      },
      {
        id: '2',
        title: 'Chaqueta Natura',
        description: 'Chaqueta biodegradable con fibras naturales y acabados artesanales',
        handle: 'chaqueta-natura',
        productType: 'Chaquetas',
        tags: ['biodegradable', 'natural', 'artesanal'],
        price: 350.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset2.jpg`,
        imageAlt: 'Chaqueta Natura'
      },
      {
        id: '3',
        title: 'Falda Circular',
        description: 'Falda de biomateriales innovadores con corte circular fluido',
        handle: 'falda-circular',
        productType: 'Faldas',
        tags: ['biomateriales', 'circular', 'fluido'],
        price: 220.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/red2.jpg`,
        imageAlt: 'Falda Circular'
      },
      {
        id: '4',
        title: 'Top Regenera',
        description: 'Top compostable con diseño minimalista y líneas limpias',
        handle: 'top-regenera',
        productType: 'Tops',
        tags: ['compostable', 'minimalista', 'limpio'],
        price: 180.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/red.jpg`,
        imageAlt: 'Top Regenera'
      },
      {
        id: '5',
        title: 'Pantalón Ciclo',
        description: 'Pantalón de fibras recicladas con ajuste perfecto',
        handle: 'pantalon-ciclo',
        productType: 'Pantalones',
        tags: ['reciclado', 'ajuste', 'cómodo'],
        price: 290.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset3.jpg`,
        imageAlt: 'Pantalón Ciclo'
      },
      {
        id: '6',
        title: 'Camisa Raíz',
        description: 'Camisa artesanal biodegradable con detalles únicos',
        handle: 'camisa-raiz',
        productType: 'Camisas',
        tags: ['artesanal', 'biodegradable', 'único'],
        price: 240.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/corset4.jpg`,
        imageAlt: 'Camisa Raíz'
      },
      {
        id: '7',
        title: 'Blazer Eco',
        description: 'Blazer estructurado de materiales sostenibles',
        handle: 'blazer-eco',
        productType: 'Chaquetas',
        tags: ['estructurado', 'sostenible', 'formal'],
        price: 420.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/gallery1.jpeg`,
        imageAlt: 'Blazer Eco'
      },
      {
        id: '8',
        title: 'Mono Orgánico',
        description: 'Mono de una pieza con fibras orgánicas certificadas',
        handle: 'mono-organico',
        productType: 'Monos',
        tags: ['orgánico', 'certificado', 'una-pieza'],
        price: 380.00,
        currency: 'EUR',
        image: `${process.env.PUBLIC_URL}/images/gallery2.jpeg`,
        imageAlt: 'Mono Orgánico'
      }
    ];
  };


  const getCategories = () => {
    const categories = ['all', ...new Set(products.map(p => p.productType).filter(Boolean))];
    return categories;
  };

  const handleProductClick = (productId) => {
    const numericId = productId.replace('gid://shopify/Product/', '');
    window.location.href = `/product/${numericId}`;
  };

  if (loading) {
    return (
      <div className="shop-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner">Cargando productos...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="shop-page">
      <Navbar />
      

      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-grid">
            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Categoría</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {getCategories().map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label className="filter-label">Precio (€)</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                  className="price-input"
                />
                <span className="price-separator">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 500 }))}
                  className="price-input"
                />
              </div>
            </div>

            {/* Sort Filter */}
            <div className="filter-group">
              <label className="filter-label">Ordenar por</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="title">Nombre</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="filter-group results-count">
              <span className="results-text">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No se encontraron productos con los filtros seleccionados.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
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
                      €{product.price.toFixed(2)}
                    </div>
                    {product.tags && product.tags.length > 0 && (
                      <div className="product-tags">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="product-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
