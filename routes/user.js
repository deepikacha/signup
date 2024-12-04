const express = require('express');
const bcrypt = require('bcryptjs');
const userController = require('../controllers/user');
const User = require('../models/user');

const router = express.Router();

// POST /register - Register a new user and hash password
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists." });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,  // Save hashed password
        });

        res.status(201).json({
            message: "User registered successfully!",
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during registration.", error: err });
    }
});

// GET /users - Get users (for testing or other purposes)
router.get('/users', userController.getUser);

// POST /login - Login and compare passwords
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the hashed password with the provided password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "User not authorized" });
        }

        // Login successful
        res.status(200).json({
            message: "User login successful!",
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred.", error: err });
    }
});

module.exports = router;
