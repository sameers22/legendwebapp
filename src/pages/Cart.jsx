import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import menuBackground from "../assets/menu-background.png"; 

const Cart = () => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("storage")); // ✅ Sync cart count in Navbar
    }, [cart]);

    const groupedCart = cart.reduce((acc, item) => {
        const existingItem = acc.find(i => i.variantId === item.variantId);
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice = (existingItem.quantity * parseFloat(item.price)).toFixed(2);
        } else {
            acc.push({ ...item, quantity: 1, totalPrice: parseFloat(item.price).toFixed(2) });
        }
        return acc;
    }, []);


    // ✅ Remove all instances of a selected item
    const removeItemCompletely = (variantId) => {
        const updatedCart = cart.filter(item => item.variantId !== variantId);
        setCart(updatedCart);
    };


    const increaseQuantity = (variantId) => {
        setCart([...cart, cart.find(item => item.variantId === variantId)]);
    };

    const decreaseQuantity = (variantId) => {
        let found = false;
        const updatedCart = cart.filter((item) => {
            if (!found && item.variantId === variantId) {
                found = true;
                return false;
            }
            return true;
        });
        setCart(updatedCart);
    };

    const totalCost = groupedCart.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);

    const checkoutWithShopify = () => {
        if (groupedCart.length === 0) return alert("Your cart is empty!");

        const cartQuery = groupedCart.map(item => `${item.variantId.split('/').pop()}:${item.quantity}`).join(",");
        window.location.href = `https://legendchefsauce.com/cart/${cartQuery}`;
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>

            {groupedCart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedCart.map((item, index) => (
                                <tr key={index} className="cart-item">
                                    <td className="cart-item-info">
                                        <img src={item.image} alt={item.title} className="cart-img" />
                                        <span className="cart-item-title">{item.title}</span>
                                    </td>
                                    <td>
                                        <button className="quantity-btn" onClick={() => decreaseQuantity(item.variantId)}>-</button>
                                        <span className="quantity-white">{item.quantity}</span>
                                        <button className="quantity-btn" onClick={() => increaseQuantity(item.variantId)}>+</button>
                                    </td>
                                    <td className="cart-price">${item.totalPrice} {item.currency}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => removeItemCompletely(item.variantId)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3 className="total-cost">Total: ${totalCost}</h3>

                    <button className="checkout-btn" onClick={checkoutWithShopify}>
                        Checkout Now
                    </button>
                </>
            )}

            <button className="back-btn" onClick={() => navigate("/sauces")}>← Back to Sauces</button>

            <style jsx>{`
                .cart-container {
                    padding: 120px 20px 50px;
                    text-align: center;
                    min-height: 100vh;
                    background: url(${menuBackground}) no-repeat center center/cover;
                    width: 100vw;  /* Ensure it spans the entire viewport width */
                    position: absolute;
                    left: 0;
                    right: 0;
                }
                .cart-title {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: gold;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
                    margin-bottom: 30px;
                }
                .empty-cart {
                    font-size: 1.5rem;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
                }
                .cart-table {
                    width: 80%;
                    margin: auto;
                    border-collapse: collapse;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 10px;
                    color: white;
                    font-size: 1.2rem;
                }
                th, td {
                    padding: 15px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
                    text-align: center;
                }
                .cart-item-info {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .cart-img {
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius: 5px;
                }
                .quantity-btn {
                    background: gold;
                    color: black;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .quantity-btn:hover {
                    background: #d4ac0d;
                }
                .quantity-white {
                    color: white;
                    font-size: 1.3rem;
                }
                .cart-price {
                    font-size: 1rem;
                    color: gold;
                }
                .total-cost {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: gold;
                    margin: 20px 0;
                }
                .remove-btn {
                    padding: 8px 12px;
                    background-color: red;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .remove-btn:hover {
                    background-color: darkred;
                }
                .checkout-btn {
                    padding: 12px 20px;
                    background-color: gold;
                    color: black;
                    border: none;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                    margin-top: 20px;
                }
                .checkout-btn:hover {
                    background: #d4ac0d;
                }
                .back-btn {
                    padding: 10px 15px;
                    background-color: gold;
                    color: black;
                    border: none;
                    border-radius: 5px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                    margin-top: 20px;
                    display: block;
                    width: 200px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .back-btn:hover {
                    background: #d4ac0d;
                }
                @media (max-width: 900px) {
                    .cart-table {
                        width: 100%;
                    }
                    .cart-img {
                        width: 40px;
                        height: 40px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Cart;
