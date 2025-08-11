import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import BackButton from './components/BackButton';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Male from './pages/products/Male';
import Female from './pages/products/Female';
import Kids from './pages/products/Kids';
import Products from './pages/products/Products';
import ShopNow from './pages/ShopNow';
import SummerDeal from './pages/offers/SummerDeal';
import BundleOffers from './pages/offers/BundleOffers';
import Clearances from './pages/offers/Clearances';
import BuyOneGetFree from './pages/offers/BuyOneGetFree';
import SummerMen from './pages/offers/SummerMen';
import SummerWomen from './pages/offers/SummerWomen';
import SummerKids from './pages/offers/SummerKids';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar />
      {/* ✅ Show BackButton on all pages except home */}
      {!isHomePage && <BackButton />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/male" element={<Male />} />
        <Route path="/products/female" element={<Female />} />
        <Route path="/products/kids" element={<Kids />} />
        <Route path="/ShopNow/products" element={<ShopNow />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/offers/summerdeal" element={<SummerDeal />} />
        <Route path="/offers/bundleoffers" element={<BundleOffers />} />
        <Route path="/offers/clearances" element={<Clearances />} />
        <Route path="/offers/buyonegetfree" element={<BuyOneGetFree />} />
        <Route path="/offers/men" element={<SummerMen />} />
        <Route path="/offers/women" element={<SummerWomen />} />
        <Route path="/offers/kids" element={<SummerKids />} />
      </Routes>
    </>
  );
}

export default App;
