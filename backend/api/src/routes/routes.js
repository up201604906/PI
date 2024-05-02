const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");
const articlesController = require('../controllers/articles_controller');
const userController = require('../controllers/user_controller');
const userAuth = require('../middlewares/user_auth');
const router = express.Router();


// auth routes
router.post('/signup', userAuth.saveUser, userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get("/home", controller.getHome);


// resources routes
router.get("/inventory/resources", resourcesController.getResources);
router.put("/inventory/resources/:id", resourcesController.updateResource);
router.get("/inventory/resources/:name", resourcesController.getResourceByName);
router.delete("/inventory/resources/:name", resourcesController.deleteResourceByName);

router.post("/inventory/createResource", resourcesController.createResource);

// user routes
router.get("/user-mgmt", userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);


router.get("/getArticles/:id", articlesController.getArticles);
router.post("/articles/create", articlesController.createArticle);





module.exports = router;
