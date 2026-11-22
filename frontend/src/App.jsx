import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { api, INITIAL_PRODUCTS } from './api/axios';

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('v1st_custom_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('v1st_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('v1st_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync products to localStorage
  useEffect(() => {
    localStorage.setItem('v1st_custom_products', JSON.stringify(products));
  }, [products]);

  // Attempt to fetch fresh products from backend on mount
  useEffect(() => {
    api.get('/products')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        // Silently keep using local/mock products
        console.log('Backend not detected yet. Operating with local seed database.');
      });
  }, []);

  // Cart operations
  const handleAddToCart = (itemToAdd) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === itemToAdd.productId &&
          item.flavor === itemToAdd.flavor &&
          item.size === itemToAdd.size
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [...prev, { ...itemToAdd, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, flavor, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, flavor, size);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.flavor === flavor && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveItem = (productId, flavor, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.flavor === flavor && item.size === size)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Product inventory operations
  const handleAddProduct = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
    // Also try posting to backend
    api.post('/products', newProd).catch(() => {});
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p._id !== productId));
    api.delete(`/products/${productId}`).catch(() => {});
  };

  const handleUpdateProduct = (productId, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, ...updates } : p))
    );
    api.put(`/products/${productId}`, updates).catch(() => {});
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            products={products}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
          />
        }
      />
      <Route
        path="/admin"
        element={
          <Admin
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
        }
      />
    </Routes>
  );
}
