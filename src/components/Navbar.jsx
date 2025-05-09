import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/leg_logo_converted.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        // ✅ Update cart count when localStorage changes
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(cart.length);
        };

        updateCartCount();
        window.addEventListener("storage", updateCartCount);
        return () => window.removeEventListener("storage", updateCartCount);
    }, []);

    return (
        <nav className={`navbar ${scrolling ? "scrolled" : ""}`}>
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <img src={logo} alt="Legend Cookhouse Logo" className={`logo-img ${scrolling ? "small-logo" : ""}`} />
                </Link>

                {/* Mobile Menu Button */}
                <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                {/* Navigation Links */}
                <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                    <li><Link to="/" className={`nav-link ${scrolling ? "small-link" : ""}`} onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/menu" className={`nav-link ${scrolling ? "small-link" : ""}`} onClick={() => setMenuOpen(false)}>Menu</Link></li>
                    <li><Link to="/sauces" className="nav-link">Sauces</Link></li>
                    <li><Link to="/reservations" className={`nav-link ${scrolling ? "small-link" : ""}`} onClick={() => setMenuOpen(false)}>Reservations</Link></li>
                    <li><Link to="/book-event" className={`nav-link ${scrolling ? "small-link" : ""}`} onClick={() => setMenuOpen(false)}>Book Event</Link></li>
                    <li><Link to="/legendfamily" className={`nav-link ${scrolling ? "small-link" : ""}`} onClick={() => setMenuOpen(false)}>Legend Family</Link></li>
                    <li><Link to="/account" className={`nav-link ${scrolling ? "small-link" : ""}`} onClick={() => setMenuOpen(false)}>Account</Link></li>

                    {/* ✅ View Cart Button (Only appears if cart is not empty) */}
                    {cartCount > 0 && (
                        <li><Link to="/cart" className="cart-link">View Cart ({cartCount})</Link></li>
                    )}

                </ul>
            </div>

            <style jsx>{`
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background: rgba(5, 5, 5, 0.8);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 15px 0;
                    transition: all 0.3s ease-in-out;
                    z-index: 1000;
                }
                .navbar.scrolled {
                    background: rgba(5, 5, 5, 0.9);
                    padding: 10px 0;
                }
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    width: 100%;
                }
                .logo-img {
                    height: 80px;
                    transition: all 0.3s ease-in-out;
                }
                .small-logo {
                    height: 50px;
                }
                .menu-button {
                    display: none;
                    font-size: 2.5rem;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: yellow;
                    z-index: 1100;
                }
                .nav-links {
                    list-style: none;
                    display: flex;
                    gap: 20px;
                    margin: 0;
                    padding: 0;
                    transition: all 0.3s ease;
                }
                .nav-link {
                    text-decoration: none;
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 5px;
                    transition: all 0.3s;
                }
                .small-link {
                    font-size: 1rem;
                    padding: 5px 10px;
                }
                .nav-link:hover {
                    color: #ffdd57;
                }
                .cart-link {
                    font-weight: bold;
                    background: gold;
                    padding: 8px 15px;
                    border-radius: 5px;
                    color: black;
                }

                @media (max-width: 900px) {
                    .menu-button {
                        display: block;
                    }
                    .nav-links {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        width: 100%;
                        background-color: rgba(0, 0, 0, 0.95);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 30px;
                        transform: translateX(${menuOpen ? "0" : "-100%"});
                        transition: transform 0.4s ease;
                        z-index: 999;
                    }
                    .nav-link {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
