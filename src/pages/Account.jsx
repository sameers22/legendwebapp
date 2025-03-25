import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signInAnonymouslyUser, logOut } from '../firebase/firebaseAuth';
import { onAuthStateChanged } from "firebase/auth";

const Account = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [user, setUser] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignUp = async () => {
        try {
            const userCredential = await signUpWithEmail(email, password);
            setUser(userCredential.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmail(email, password);
            setUser(userCredential.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            setUser(result.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAnonymousSignIn = async () => {
        try {
            const result = await signInAnonymouslyUser();
            setUser(result.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
            setUser(null);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="account-page">
            <h1>Account Authentication</h1>

            {user ? (
                <div className="user-info">
                    <p>Welcome, {user.email || "Anonymous User"}</p>
                    <button className="btn" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="auth-form">
                    {showSignUp ? (
                        <>
                            <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                            <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button className="btn" onClick={handleSignUp}>Sign Up</button>
                            <button className="btn" onClick={() => setShowSignUp(false)}>Back to Sign In</button>
                        </>
                    ) : (
                        <>
                            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            <button className="btn" onClick={handleSignIn}>Sign In</button>
                            <button className="btn" onClick={() => setShowSignUp(true)}>Sign Up</button>
                            <button className="btn google-btn" onClick={handleGoogleSignIn}>Sign In with Google</button>
                            <button className="btn anonymous-btn" onClick={handleAnonymousSignIn}>Guest User</button>
                        </>
                    )}
                </div>
            )}

            <style jsx>{`
                .account-page {
                    padding-top: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #f0f0f0;
                    min-height: 100vh;
                }

                h1 {
                    font-size: 2.5rem;
                    color: #333;
                    margin-bottom: 30px;
                }

                .auth-form {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    width: 350px;
                }

                .auth-form input {
                    padding: 10px;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .btn {
                    padding: 10px 15px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin-top: 5px;
                    width: 100%;
                }

                .btn:hover {
                    background-color: #0056b3;
                }

                .google-btn {
                    background-color: #db4437;
                }

                .google-btn:hover {
                    background-color: #b23423;
                }

                .anonymous-btn {
                    background-color: #6c757d;
                }

                .anonymous-btn:hover {
                    background-color: #5a6268;
                }
            `}</style>
        </div>
    );
};

export default Account;
