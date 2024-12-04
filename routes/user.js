const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// POST /add-user
router.post('/register', userController.postAddUser);
router.get('/users', userController.getUser);



module.exports = router;
