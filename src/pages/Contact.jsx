import React, { useState } from 'react';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        alert(`Message sent from: ${email} \n Message: ${message}`);
        setEmail('');
        setMessage('');
    };

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} />
            <textarea placeholder="Your Message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Contact;
