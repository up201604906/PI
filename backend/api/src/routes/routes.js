const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");
const licensesController = require("../controllers/licenses_controller");

const router = express.Router();

router.get("/", controller.getHome);
router.get("/users", controller.getUsers);


// resources routes
router.get("/inventory/resources", resourcesController.getResources);
router.put("/inventory/resources/:id", resourcesController.updateResource);
router.get("/inventory/resources/:name", resourcesController.getResourceByName);
router.delete("/inventory/resources/:name", resourcesController.deleteResourceByName);

router.post("/inventory/createResource", resourcesController.createResource);


// licenses routes
router.get("/inventory/licenses", licensesController.getLicenses);
router.put("/inventory/licenses/:id", licensesController.updateLicense);
router.get("/inventory/licenses/:id", licensesController.getLicenseById);
router.delete("/inventory/licenses/:id", licensesController.deleteLicenseById);

router.post("/inventory/createLicense", licensesController.createLicense);

module.exports = router;
