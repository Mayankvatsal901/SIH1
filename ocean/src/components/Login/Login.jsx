
// src/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    // State to hold the user's input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State to hold any error messages from the backend
    const [error, setError] = useState('');

    // This function runs when the user clicks the "Login" button
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents the form from refreshing the page
        setError(''); // Clear any previous errors

        try {
            // ➡️ Send the email and password to your backend API
            const response = await axios.post('http://localhost:5000/api/login', {
                email: email,
                password: password,
            });

            // If login is successful, the backend sends back a token
            const { token } = response.data;

            // 💾 Store the token in the browser's local storage
            localStorage.setItem('token', token);

            // Let the user know they are logged in!
            alert('Login successful!');
            
            // You can now redirect to a dashboard or another protected page
            // window.location.href = '/dashboard';

        } catch (err) {
            // If the backend returns an error (e.g., wrong password), display it
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div style={{ width: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
                    Login
                </button>
            </form>
            {/* If there's an error, display it in red */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default Login;



