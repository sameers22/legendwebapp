import React, { useState } from "react";
import backgroundImg from "../assets/book-event-background.jpg"; // ✅ Background Image

const BookEvent = () => {
    const [eventDetails, setEventDetails] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: "Private Dining",
        guests: 1,
        date: "",
        time: "",
        specialRequest: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(`Thank you, ${eventDetails.name}! Your event request has been submitted.`);
    };

    return (
        <div className="book-event-container">
            <div className="background-overlay"></div>
            <div className="book-event-page">
                <h1>Book an Event</h1>
                <p>Host your special event at Legend Cookhouse. Let us create a memorable experience for you.</p>

                <div className="event-form-container">
                    <form className="event-form" onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Full Name" required value={eventDetails.name} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email Address" required value={eventDetails.email} onChange={handleChange} />
                        <input type="tel" name="phone" placeholder="Phone Number" required value={eventDetails.phone} onChange={handleChange} />

                        <select name="eventType" required value={eventDetails.eventType} onChange={handleChange}>
                            <option value="Private Dining">Private Dining</option>
                            <option value="Birthday Party">Birthday Party</option>
                            <option value="Corporate Event">Corporate Event</option>
                            <option value="Wedding Reception">Wedding Reception</option>
                            <option value="Other">Other</option>
                        </select>

                        <input type="date" name="date" required value={eventDetails.date} onChange={handleChange} />
                        <input type="time" name="time" required value={eventDetails.time} onChange={handleChange} />

                        <select name="guests" required value={eventDetails.guests} onChange={handleChange}>
                            {[...Array(50).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>{num + 1} Guest{num > 0 ? "s" : ""}</option>
                            ))}
                        </select>

                        <textarea name="specialRequest" placeholder="Special Requests (optional)" value={eventDetails.specialRequest} onChange={handleChange} />

                        <button type="submit">Submit Request</button>
                    </form>

                    {message && <p className="confirmation-message">{message}</p>}
                </div>
            </div>

            <style jsx>{`
                .book-event-container {
                    padding: 2rem 0rem 0rem;
                    height: 100vh;
                    background: url(${backgroundImg}) no-repeat center center/cover;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100vw;  /* Ensure it spans the entire viewport width */
                    position: absolute;
                    left: 0;
                    right: 0;
                }

                .background-overlay {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(5px);
                    z-index: 1;
                }

                .book-event-page {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    color: white;
                    max-width: 700px;
                }

                h1 {
                    font-size: 2.5rem;
                    font-weight: bold;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }

                p {
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
                }

                .event-form-container {
                    background: rgba(255, 255, 255, 0.9);
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
                }

                .event-form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                input, select, textarea {
                    width: 95%;
                    padding: 12px;
                    border: none;
                    border-radius: 5px;
                    font-size: 1rem;
                }

                textarea {
                    resize: none;
                    height: 100px;
                }

                button {
                    background: #d35400;
                    color: white;
                    padding: 12px;
                    border: none;
                    cursor: pointer;
                    font-size: 1.1rem;
                    border-radius: 5px;
                    font-weight: bold;
                }

                button:hover {
                    background: #a04000;
                }

                .confirmation-message {
                    margin-top: 15px;
                    font-size: 1.2rem;
                    color: green;
                }

                @media (max-width: 768px) {
                    .book-event-page {
                        max-width: 90%;
                    }

                    .event-form-container {
                        padding: 15px;
                    }
                }
            `}</style>
        </div>
    );
};

export default BookEvent;