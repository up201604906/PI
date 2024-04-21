const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");
const articlesController = require('../controllers/articles_controller');
const userController = require('../controllers/user_controller');
const userAuth = require('../middlewares/user_auth');
const router = express.Router();



router.post('/signup', userAuth.saveUser, userController.signup);
router.post('/login', userController.login);

router.get('/user/:id', userController.getUserById);




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


router.get("/articles/byUser/:userId", articlesController.getArticles);
router.post("/articles/create", articlesController.createArticle);





module.exports = router;
