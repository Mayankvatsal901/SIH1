
// server.js

// 1. IMPORT TOOLS
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { Pool } = require('pg'); // The tool to talk to our PostgreSQL database

// 2. INITIAL SETUP
const app = express();
const PORT = 5000;
const JWT_SECRET = 'a-very-secret-and-long-key-for-your-tokens';

// 3. MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

// 4. DATABASE CONNECTION
// ⚠️ IMPORTANT: Fill in your user and password here!
const pool = new Pool({
    user: 'postgres',                 // Or your specific database user
    host: 'localhost',
    database: 'ocean_users',          // The database name we created
    password: 'Mayank@#',   // Replace with the password you created
    port: 5432,
});

// 5. DEFINE API ROUTES

// ## The "Register a New User" Route ##
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;

    // Check for missing email or password
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Hash (scramble) the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user to the database
        const newUser = await pool.query(
            "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );
        res.status(201).json({ message: "User created successfully!", user: newUser.rows[0] });
    } catch (error) {
        console.error(error.message);
        // Handle the case where the email is already taken
        if (error.code === '23505') { // '23505' is the PostgreSQL error code for unique violation
            return res.status(400).json({ message: "User with this email already exists." });
        }
        res.status(500).json({ message: "Error creating user." });
    }
});

// ## The "Login an Existing User" Route ##
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Find the user in the database by their email
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        // If no user is found, send an error
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const user = userResult.rows[0];

        // Compare the password from the request with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // If password is correct, create a JWT (a temporary access ticket)
        const payload = { user: { id: user.id, email: user.email } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        // Send the ticket back to the React app
        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error." });
    }
});

// 6. START THE SERVER
app.listen(PORT, () => {
    console.log(`🚀 Back office server is running and listening on port ${PORT}`);
});