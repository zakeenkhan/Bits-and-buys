import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Shift Dress",
      price: "$19.99",
      stars: "⭐⭐⭐⭐☆",
      img: "https://images.unsplash.com/photo-1641610856184-99f8e66da478?w=600",
    },
    {
      id: 2,
      name: "A-Line Dress",
      price: "$29.99",
      stars: "⭐⭐⭐⭐⭐",
      img: "https://plus.unsplash.com/premium_photo-1707816501324-cd60a5afcd64?w=600",
    },
    {
      id: 3,
      name: "Maxi Dress",
      price: "$39.99",
      stars: "⭐⭐⭐⭐☆",
      img: "https://images.unsplash.com/photo-1681071555947-72f4835c7f4a?w=600",
    },
    {
      id: 4,
      name: "Wrap Dress",
      price: "$49.99",
      stars: "⭐⭐⭐☆☆",
      img: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80",
    },
    {
      id: 5,
      name: "Bodycon Dress",
      price: "$35.00",
      stars: "⭐⭐⭐⭐⭐",
      img: "https://images.unsplash.com/photo-1683126258391-3882e183e569?w=600",
    },
  ];

  const handleViewClick = () => {
    toast.info("🛍️ The product will arrive soon.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span>Bits & Buy</span>
        </motion.h1>
        <p>Your one-stop shop for quality products at the best prices.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/ShopNow/products" className="btn">View Products</Link>
        </motion.div>
      </motion.header>

      {/* Featured Section */}
      <motion.section
        className="features"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product, index) => (
            <motion.div
              className="product-card"
              key={product.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <div className="rating">{product.stars}</div>
              <button className="btn-sm" onClick={handleViewClick}>View</button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="about"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2>About Us</h2>
        <p>
          At <strong>Bits & Buy</strong>, we're more than just an online store—we're a brand committed to delivering
          quality, style, and value to your doorstep. Our carefully curated collection of fashion-forward clothing and
          lifestyle products is designed to meet the needs of the modern shopper who values both affordability and elegance.
        </p>
        <p>
          From trendy outfits that make a statement to practical accessories that simplify your day, our goal is to make
          online shopping not just convenient, but truly enjoyable. With a focus on customer satisfaction, timely delivery,
          and top-tier service, <strong>Bits & Buy</strong> is your trusted destination for all things chic and essential.
        </p>
      </motion.section>

      {/* Footer */}
      <Footer />

      {/* Scroll-to-Top Button */}
      {showTopBtn && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          ⬆ Top
        </motion.button>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HomePage;
