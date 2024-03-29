const express = require('express');
const controller = require('../controllers/controller');

const resourcesController = require("../controllers/resources_controller");

const router = express.Router();

router.get('/', controller.getHome);
router.get('/users', controller.getUsers);

router.get("/inventory/resources", resourcesController.getResources);

module.exports = router;
