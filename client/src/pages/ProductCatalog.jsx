import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiRequest('/api/products')
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section style={{ backgroundColor: '#fff', borderRadius: '8px', marginTop: '20px', padding: '24px' }}>
      <h2 style={{ marginTop: 0 }}>Product Catalog</h2>
      {error && <p style={{ color: '#b42318' }}>{error}</p>}
      {!error && products.length === 0 && <p>No products found.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {products.map((product) => (
          <article key={product._id} style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '16px' }}>
            <strong>{product.name}</strong>
            <p style={{ margin: '8px 0', color: '#667085' }}>{product.category || 'General'}</p>
            <p style={{ margin: 0 }}>${product.basePricePerDay}/day</p>
            <small>{product.availableStock} available</small>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductCatalog;
