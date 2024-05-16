const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");
const wishlistController = require("../controllers/wishlist_controller");
const licensesController = require("../controllers/licenses_controller");
const pcAllocationController = require("../controllers/pcallocation_controller");

const router = express.Router();

router.get("/", controller.getHome);
router.get("/users", controller.getUsers);


// resources routes
router.get("/inventory/resources", resourcesController.getResources);
router.put("/inventory/resources/:id", resourcesController.updateResource);
router.get("/inventory/resources/:name", resourcesController.getResourceByName);
router.delete("/inventory/resources/:name", resourcesController.deleteResourceByName);

router.post("/inventory/createResource", resourcesController.createResource);

// wishlist routes
router.get("/inventory/wishlist", wishlistController.getWishlist);
router.delete("/inventory/wishlist/:user_name/:resource_name/:potential_resource_name", wishlistController.deleteResourceFromWishlist);
router.put("/inventory/wishlist/:user_name/:resource_name/:potential_resource_name", wishlistController.updateResourceInWishlist);
router.post("/inventory/wishlist/moveToResources", wishlistController.moveToResources);

router.post("/inventory/addToWishlist", wishlistController.addResourceToWishlist);


// licenses routes
router.get("/inventory/licenses", licensesController.getLicenses);
router.put("/inventory/licenses/:id", licensesController.updateLicense);
router.get("/inventory/licenses/:id", licensesController.getLicenseById);
router.delete("/inventory/licenses/:id", licensesController.deleteLicenseById);

router.post("/inventory/createLicense", licensesController.createLicense);


// pc allocation routes
router.get("/inventory/pcallocation", pcAllocationController.getPCAllocations);
router.put("/inventory/pcallocation/:id", pcAllocationController.updatePCAllocation);
router.get("/inventory/pcallocation/:id", pcAllocationController.getPCAllocationById);
router.delete("/inventory/pcallocation/:id", pcAllocationController.deletePCAllocationById);

router.post("/inventory/createPCAllocation", pcAllocationController.createPCAllocation);

module.exports = router;
