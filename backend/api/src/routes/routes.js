const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");

const router = express.Router();

router.get("/", controller.getHome);
router.get("/users", controller.getUsers);


// resources routes
router.get("/inventory/resources", resourcesController.getResources);
router.put("/inventory/resources/:id", resourcesController.updateResource);
router.get("/inventory/resources/:name", resourcesController.getResourceByName);
router.delete("/inventory/resources/:name", resourcesController.deleteResourceByName);

router.post("/inventory/createResource", resourcesController.createResource);

// user management routes
router.get("/user-mgmt", controller.getUsers);


module.exports = router;
