import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpg';
import formal from './formal.jpg';
import casual from './casual.jpg';
import jeans from './jeans.jpg';
import shorts from './shorts.jpg';
import trackpants from './trackpants.jpg';
import tshirt from './tshirt.jpg';
import dress from './dress.jpg';
import sareewear from './sareewear.jpg';
import westernwear from './westernwear.jpg';
import ethnicwear from './ethnicwear.jpg';
import babydress from './babydress.jpg';
import childboywear from './childboy.jpg';
import childshirt from './childshirt.jpg';
import kidswear from './kidswear.jpg';
import './Home.css';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useCart } from './CartContext';

export default function Home() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, wishlist, searchQuery, setSearchQuery } = useCart();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const casualwear = () => {
    navigate("/casual");
  };
  const Formalwear = () => {
    navigate("/formal");
  };
  const Jeans = () => {
    navigate("/jeans");
  };
  const Shorts = () => {
    navigate("/shorts");
  };
  const Trackpants = () => {
    navigate("/trackpants");
  };
  const Tshirts = () => {
    navigate("/Tshirts");
  };
  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
          <div className="auth-container">
            <span className="auth-label" onClick={() => navigate('/wishlist')}><big>❤️ ({wishlist.length})</big></span>
            <span className="auth-label" onClick={() => navigate('/cart')}>🛒 ({cart.length})</span>
            <span className="auth-label" onClick={() => navigate('/')} >Logout</span>
            {/* <span className="auth-label" onClick={() => navigate('/signup')}>Sign Up</span> */}
          </div>
        </header>
        <nav className="nav">
          <button className="hamburger-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="menu-item" onClick={() => { scrollToSection('mens-section'); setIsMenuOpen(false); }}>Men</div>
            <div className="menu-item" onClick={() => { scrollToSection('womens-section'); setIsMenuOpen(false); }}>Women</div>
            <div className="menu-item" onClick={() => { scrollToSection('kids-section'); setIsMenuOpen(false); }}>Kids</div>
          </div>
          {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
        </nav>
        <main className="main-content">
        <section id="mens-section" className="mens-section">
          <h2 className="section-title">Mens</h2>
          <div className="product-grid">
            <div className="product-card" onClick={casualwear}>
              <img src={casual} alt="Casual Wear" className="product-image" />
              <h3 className="product-title">Casual Wear</h3>
              <p className="product-price">₹299.99</p>
            </div>
            <div className="product-card">
              <div className="product-card" onClick={Formalwear}>
                <img src={formal} alt="Formal Wear" className="product-image" />
                <h3 className="product-title">Formal Wear</h3>
                <p className="product-price">₹499.99</p>
              </div>
            </div>
            <div className="product-card" onClick={Jeans}>
              <img src={jeans} alt="Jeans" className="product-image" />
              <h3 className="product-title">Jeans</h3>
              <p className="product-price">₹949.99</p>
            </div>
            <div className="product-card" onClick={Shorts}>
              <img src={shorts} alt="Shorts" className="product-image" />
              <h3 className="product-title">Shorts</h3>
              <p className="product-price">₹199.99</p>
            </div>
            <div className="product-card" onClick={Trackpants}>
              <img src={trackpants} alt="Track Pants" className="product-image" />
              <h3 className="product-title">Track Pants</h3>
              <p className="product-price">₹349.99</p>
            </div>
            <div className="product-card" onClick={Tshirts}>
              <img src={tshirt} alt="T-Shirt" className="product-image" />
              <h3 className="product-title">T-Shirt</h3>
              <p className="product-price">₹249.99</p>
            </div>
          </div>
        </section>

        <section id="womens-section" className="womens-section">
          <h2 className="section-title">Womens</h2>
          <div className="product-grid">
            <div className="product-card" onClick={() => navigate('/dress')}>
              <img src={dress} alt="Dress" className="product-image" />
              <h3 className="product-title">Dress</h3>
              <p className="product-price">₹599.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/sareewear')}>
              <img src={sareewear} alt="Saree Wear" className="product-image" />
              <h3 className="product-title">Saree Wear</h3>
              <p className="product-price">₹799.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/westernwear')}>
              <img src={westernwear} alt="Western Wear" className="product-image" />
              <h3 className="product-title">Western Wear</h3>
              <p className="product-price">₹399.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/ethnicwear')}>
              <img src={ethnicwear} alt="Ethnic Wear" className="product-image" />
              <h3 className="product-title">Ethnic Wear</h3>
              <p className="product-price">₹499.99</p>
            </div>

          </div>
        </section>

        <section id="kids-section" className="kids-section">
          <h2 className="section-title">Kids</h2>
          <div className="product-grid">
            <div className="product-card" onClick={() => navigate('/babydress')}>
              <img src={babydress} alt="Baby Dress" className="product-image" />
              <h3 className="product-title">Baby Dress</h3>
              <p className="product-price">₹199.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/childboywear')}>
              <img src={childboywear} alt="Child Boy Wear" className="product-image" />
              <h3 className="product-title">Child Boy Wear</h3>
              <p className="product-price">₹299.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/childdress')}>
              <img src={childshirt} alt="Child Dress" className="product-image" />
              <h3 className="product-title">Child Dress</h3>
              <p className="product-price">₹249.99</p>
            </div>
            <div className="product-card" onClick={() => navigate('/kidswear')}>
              <img src={kidswear} alt="Kids Wear" className="product-image" />
              <h3 className="product-title">Kids Wear</h3>
              <p className="product-price">₹349.99</p>
            </div>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}
