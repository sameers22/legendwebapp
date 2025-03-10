import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menuBackground from "../assets/menu-background.png"; // ✅ Use menu background

const Sauces = () => {
    const [sauces, setSauces] = useState([]);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSauces = async () => {
            try {
                const response = await fetch("http://localhost:5002/api/shopify-products");
                if (!response.ok) throw new Error("Failed to fetch products");
                const data = await response.json();
                setSauces(data.products || []);
            } catch (error) {
                console.error("Error fetching sauces:", error);
            }
        };
        fetchSauces();
    }, []);

    const addToCart = (sauce) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(sauce);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="sauces-container">
            <h1 className="sauces-title">Our Signature Sauces</h1>
            <div className="sauces-grid">
                {sauces.map((sauce, index) => (
                    <div key={index} className="sauce-card">
                        <img src={sauce.image} alt={sauce.title} className="sauce-image" />
                        <h2 className="sauce-title">{sauce.title}</h2>
                        <p className="price">${sauce.price} {sauce.currency}</p>
                        <button className="order-btn" onClick={() => addToCart(sauce)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .sauces-container {
                    padding: 120px 20px 50px;
                    text-align: center;
                    min-height: 100vh;
                    background: url(${menuBackground}) no-repeat center center/cover; /* ✅ Menu page background */
                    width: 100vw;  /* Ensure it spans the entire viewport width */
                    position: absolute;
                    left: 0;
                    right: 0;
                }
                .sauces-title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: gold;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
                    margin-bottom: 30px;
                }
                .sauces-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr); /* ✅ Three items per row */
                    gap: 20px;
                    justify-items: center;
                }
                .sauce-card {
                    background: rgba(0, 0, 0, 0.7); /* ✅ Translucent black */
                    border-radius: 10px;
                    padding: 15px;
                    width: 280px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
                    text-align: center;
                    transition: transform 0.3s ease-in-out;
                }
                .sauce-card:hover {
                    transform: translateY(-5px);
                }
                .sauce-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 10px;
                }
                .sauce-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: white;
                    margin-top: 10px;
                }
                .price {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: gold;
                    margin: 10px 0;
                }
                .order-btn {
                    padding: 10px 15px;
                    background-color: gold;
                    color: black;
                    border: none;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .order-btn:hover {
                    background-color: #d4ac0d;
                }
                .view-cart-btn {
                    background: gold;
                    color: black;
                    padding: 12px 20px;
                    font-size: 1.2rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                    margin-top: 30px;
                }
                .view-cart-btn:hover {
                    background: #d4ac0d;
                }
                @media (max-width: 900px) {
                    .sauces-grid {
                        grid-template-columns: repeat(2, 1fr); /* ✅ Two per row on tablets */
                    }
                }
                @media (max-width: 600px) {
                    .sauces-grid {
                        grid-template-columns: repeat(1, 1fr); /* ✅ Single column for mobile */
                    }
                }
            `}</style>
        </div>
    );
};

export default Sauces;
