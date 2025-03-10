import React, { useState, useEffect } from 'react';
import backgroundImg from '../assets/reservation-background.png';

// ✅ Import All Stickman Waiter Images
import waiterStraight from '../assets/waiter-straight.jpg';
import waiterLeft from '../assets/waiter-left.jpeg';
import waiterRight from '../assets/waiter-right.jpeg';
import waiterUp from '../assets/waiter-up.jpeg';
import waiterDown from '../assets/waiter-down.jpeg';
import waiterUpperLeft from '../assets/waiter-upper-left.jpeg';
import waiterUpperRight from '../assets/waiter-upper-right.jpeg';
import waiterDownLeft from '../assets/waiter-down-left.jpeg';
import waiterDownRight from '../assets/waiter-down-right.jpeg';

const Reservations = () => {
    const [reservation, setReservation] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 1,
        specialRequest: ''
    });

    const [submitted, setSubmitted] = useState(false); // ✅ Track if form is submitted
    const [greeting, setGreeting] = useState('Hello, welcome to Legend Cookhouse!');
    const [waiterImage, setWaiterImage] = useState(waiterStraight); // Default Image

    const handleChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });

        // ✅ Extract First Name Only
    if (e.target.name === "name") {
        const firstName = e.target.value.split(" ")[0]; // Get first word before space
        setGreeting(firstName ? `Hello, ${firstName}!` : "Hello, welcome to Legend Cookhouse!");
    }
    };

    const handleMouseMove = (e) => {
        const waiter = document.querySelector(".waiter-img");
        if (!waiter) return;
    
        // Get waiter bounding box (position & size)
        const rect = waiter.getBoundingClientRect();
        const waiterCenterX = rect.left + rect.width / 2;
        const waiterCenterY = rect.top + rect.height / 2;
    
        // Get mouse position relative to waiter
        const deltaX = e.clientX - waiterCenterX;
        const deltaY = e.clientY - waiterCenterY;
    
        // Normalize values (-1 to 1 range)
        const horizontal = deltaX / rect.width;
        const vertical = deltaY / rect.height;
    
        // Determine Waiter Image Based on Mouse Position
        if (horizontal < -0.5 && vertical < -0.5) setWaiterImage(waiterUpperLeft);
        else if (horizontal > 0.5 && vertical < -0.5) setWaiterImage(waiterUpperRight);
        else if (horizontal < -0.5 && vertical > 0.5) setWaiterImage(waiterDownLeft);
        else if (horizontal > 0.3 && vertical > 0.3) setWaiterImage(waiterDownRight);
        else if (horizontal < -0.5) setWaiterImage(waiterLeft);
        else if (horizontal > 0.5) setWaiterImage(waiterRight);
        else if (vertical < -0.5) setWaiterImage(waiterUp);
        else if (vertical > 0.5) setWaiterImage(waiterDown);
        else setWaiterImage(waiterStraight);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true); // ✅ Set submission state to true

        const firstName = reservation.name.split(" ")[0] || "Guest"; // Get first name or default to "Guest"
        setGreeting(`Thank you for your reservation, ${firstName}!`);

        // ✅ Reset form & greeting after 3 seconds
        setTimeout(() => {
            setSubmitted(false); // ✅ Reset submitted state
            setReservation({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                guests: 1,
                specialRequest: ''
            });
            setGreeting("Hello, welcome to Legend Cookhouse!"); // Reset greeting
        }, 3000);
    };

    return (
        <div className="reservation-container">
            <div className="background-overlay"></div>
            <div className="reservation-page">
                
                <h1>Reserve a Table</h1>
                <p>Enjoy an exclusive dining experience at Legend Cookhouse.</p>

                <div className="reservation-box">
                    {/* ✅ Waiter Section with Thought Bubble */}
                    <div className="waiter-section">
                        <div className="thought-bubble">
                            <p>{greeting}</p>
                            <div className="thought-bubble-tiny"></div> {/* ✅ Tiny Bubble */}
                        </div>
                        <img src={waiterImage} alt="Waiter" className="waiter-img" />
                    </div>

                    <form className="reservation-form" onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Full Name" required value={reservation.name} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email Address" required value={reservation.email} onChange={handleChange} />
                        <input type="tel" name="phone" placeholder="Phone Number" required value={reservation.phone} onChange={handleChange} />
                        <input type="date" name="date" required value={reservation.date} onChange={handleChange} />
                        <input type="time" name="time" required value={reservation.time} onChange={handleChange} />
                        <select name="guests" required value={reservation.guests} onChange={handleChange}>
                            {[...Array(10).keys()].map(num => <option key={num + 1} value={num + 1}>{num + 1} Guest{num > 0 ? 's' : ''}</option>)}
                        </select>
                        <textarea name="specialRequest" placeholder="Special Requests (optional)" value={reservation.specialRequest} onChange={handleChange} />
                        <button type="submit">Submit Reservation</button>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .reservation-container {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    background: url(${backgroundImg}) no-repeat center center/cover;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    left: 0;
                    right: 0;
                }
                .background-overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(8px);
                    z-index: 1;
                }
                .reservation-page {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    color: white;
                    max-width: 700px;
                }
                .reservation-box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
                }
                .waiter-section {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-right: 80px;
                }
                .waiter-img {
                    height: 380px;
                    transition: all 0.3s ease-in-out;
                }
                .thought-bubble {
                    position: absolute;
                    top: -10px;
                    right: 50%;
                    transform: translateX(50%);
                    width: 220px;
                    background: black; /* ✅ Set background to black */
                    padding: 15px;
                    border-radius: 20px; /* ✅ Rounded shape */
                    text-align: center;
                    font-size: 1rem;
                    font-weight: bold;
                    color: white; /* ✅ Set text color to white */
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
                    position: relative;
                }

                /* ✅ Thought Bubble Tail - Three Small Circles */
                .thought-bubble:before,
                .thought-bubble:after {
                    content: "";
                    position: absolute;
                    background: black;
                    border-radius: 50%;
                }

                /* ✅ Large Bubble Tail */
                .thought-bubble:before {
                    width: 18px;
                    height: 18px;
                    bottom: -12px;
                    left: 25%;
                }

                /* ✅ Smallest Bubble */
                .thought-bubble:after {
                    width: 10px;
                    height: 10px;
                    bottom: -25px;
                    left: 30%;
                }

                /* ✅ Tiny Third Bubble */
                .thought-bubble-tiny {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: black;
                    border-radius: 50%;
                    bottom: -35px;
                    left: 35%;
                }
                .reservation-form {
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    padding-left: 20px;
                }
                input, select, textarea {
                    width: 100%;
                    padding: 10px;
                    margin: 10px 0;
                    border: none;
                    border-radius: 5px;
                }
                button {
                    background: #ffd700;
                    color: black;
                    padding: 10px;
                    border: none;
                    cursor: pointer;
                    width: 100%;
                    font-weight: bold;
                    border-radius: 5px;
                }
                button:hover {
                    background: #e6c200;
                }
            `}</style>
        </div>
    );
};

export default Reservations;
