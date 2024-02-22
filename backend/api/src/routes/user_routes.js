const express = require('express');

const userController = require('../controllers/user_controller');
const userAuth = require('../middlewares/user_auth');


const router = express.Router();

// Existing routes for signup and login
router.post('/signup', userAuth.saveUser, userController.signup);
router.post('/login', userController.login);

// New route for fetching a user by ID
router.get('/user/:id', userController.getUserById);

module.exports = router;
