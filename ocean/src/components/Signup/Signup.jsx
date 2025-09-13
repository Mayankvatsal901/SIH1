// src/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './Sign.css' // Import the CSS

const Signup = () => {
    const [isSignUpActive, setIsSignUpActive] = useState(false);

    // State for Sign Up form
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpMessage, setSignUpMessage] = useState('');

    // State for Sign In form
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [signInMessage, setSignInMessage] = useState('');

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setSignUpMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                email: signUpEmail,
                password: signUpPassword
            });
            setSignUpMessage({ type: 'success', text: response.data.message + " Please sign in." });
        } catch (error) {
            setSignUpMessage({ type: 'error', text: error.response?.data?.message || 'Registration failed.' });
        }
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setSignInMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: signInEmail,
                password: signInPassword
            });
            localStorage.setItem('token', response.data.token);
            setSignInMessage({ type: 'success', text: 'Login successful! Redirecting...' });
            // You can redirect here: window.location.href = '/dashboard';
        } catch (error) {
            setSignInMessage({ type: 'error', text: error.response?.data?.message || 'Login failed.' });
        }
    };

    return (
        <div className="auth-body">
            <div className={`auth-container ${isSignUpActive ? "right-panel-active" : ""}`} id="container">
                <div className="form-container sign-up-container">
                    <form className="auth-form" onSubmit={handleSignUpSubmit}>
                        <h1 className="auth-h1">Create Account</h1>
                        <input className="auth-input" type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
                        <input className="auth-input" type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
                        <button className="auth-button" type="submit">Sign Up</button>
                        {signUpMessage && <p className={`message ${signUpMessage.type}`}>{signUpMessage.text}</p>}
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form className="auth-form" onSubmit={handleSignInSubmit}>
                        <h1 className="auth-h1">Sign in</h1>
                        <input className="auth-input" type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} required />
                        <input className="auth-input" type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required />
                        <button className="auth-button" type="submit">Sign In</button>
                        {signInMessage && <p className={`message ${signInMessage.type}`}>{signInMessage.text}</p>}
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1 className="auth-h1">Welcome Back!</h1>
                            <p className="auth-p">To keep connected with us please login with your personal info</p>
                            <button className="auth-button ghost" onClick={() => setIsSignUpActive(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1 className="auth-h1">Hello, Friend!</h1>
                            <p className="auth-p">Enter your personal details and start your journey with us</p>
                            <button className="auth-button ghost" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;