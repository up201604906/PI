const express = require('express');
const userController = require('../controllers/user_controller');
const userAuth = require('../middlewares/user_auth');

const router = express.Router();

// Existing routes for signup and login
router.post('/signup', userAuth.saveUser, userController.signup);
router.post('/login', userController.login);

router.get('/user/:id', userController.getUserById);

router.get('/users', userController.getUsers);

module.exports = router;
