const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.get('/', controller.getHome);
router.get('/users', controller.getUsers);

router.get('/inventory/resources', controller.getResources);

module.exports = router;
