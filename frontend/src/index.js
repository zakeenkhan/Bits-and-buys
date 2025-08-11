import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { BrowserRouter } from 'react-router-dom';     // ✅ needed for routing

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        
    <CartProvider>         
      <BrowserRouter>        
        <App />
      </BrowserRouter>
    </CartProvider>

);
