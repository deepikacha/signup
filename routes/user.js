const express = require('express');
const userController = require('../controllers/user');
const User = require('../models/user'); 

const router = express.Router();

// POST /add-user
router.post('/register', userController.postAddUser);
router.get('/users', userController.getUser);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        // Check if email exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(401).json({ message: "User not authorized" });
        }

        // Login successful
        res.status(200).json({
            message: "User Login successful!",
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred.", error: err });
    }
});

module.exports = router;
