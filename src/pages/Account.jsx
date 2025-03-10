import React, { useState } from 'react';

const Account = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        phone: '123-456-7890',
        profilePic: 'https://via.placeholder.com/150',
        email: 'johndoe@example.com',
    });

    const handleUpdate = () => {
        alert('Account updated successfully!');
    };

    return (
        <div className="account-page">
            <h1 className="title">My Account</h1>
            <p className="subtitle">Manage your account details and promotions.</p>

            <div className="account-info">
                <img src={user.profilePic} alt="Profile" className="profile-pic" />
                <input type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                <input type="email" value={user.email} readOnly />
                <input type="text" value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} />
                <button onClick={handleUpdate}>Update Profile</button>
            </div>

            <section className="promotions">
                <h2>Exclusive Deals for You</h2>
                <div className="promo-banner">
                    <p>🎉 Special Offer: Get 15% off your next order!</p>
                </div>
            </section>

            <style jsx>{`
                .account-page {
                    text-align: center;
                    padding: 2rem;
                    background-color: #f8f8f8;
                }
                .title {
                    font-size: 2.5rem;
                    font-weight: bold;
                }
                .subtitle {
                    color: #777;
                }
                .account-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    max-width: 400px;
                    margin: 20px auto;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                .profile-pic {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
                .account-info input {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 100%;
                }
                .account-info button {
                    padding: 10px;
                    background-color: #2c3e50;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .promotions {
                    margin-top: 20px;
                    padding: 1rem;
                    background-color: #e67e22;
                    color: white;
                    font-size: 1.2rem;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default Account;
