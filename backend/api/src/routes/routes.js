const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");
const articlesController = require('../controllers/articles_controller');
const userController = require('../controllers/user_controller');
const userAuth = require('../middlewares/user_auth');
const router = express.Router();

// =====================  NOTIFICATION ROUTES ===================== //         

let clients = [];

router.get('/notifications', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Function to send a heartbeat every minute to keep the connection alive
    const heartbeat = setInterval(() => {
        res.write(':heartbeat\n\n');
    }, 60000);

    // Add client to the list of clients
    clients.push(res);

    // Send a welcome message upon connection
    res.write(`data: ${JSON.stringify({ message: "Connected to notification stream" })}\n\n`);

    // Remove client and clear heartbeat when connection is closed
    req.on('close', () => {
        clearInterval(heartbeat);
        clients.splice(clients.indexOf(res), 1);
        res.end();
    });
});

// Function to send notifications to all connected clients
// Function to send notifications to all connected clients
const sendNotification = (data) => {
    const formattedData = JSON.stringify({ type: 'Notification', details: data });
    clients.forEach(client =>
        client.write(`data: ${formattedData}\n\n`)
    );
};



/// ===================== ROUTES ===================== ///



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


router.get("/getArticles/:id", articlesController.getArticlesByUser);
router.get("/articles", articlesController.getAllArticles);
router.get("/articles/:id", articlesController.getArticleById);
router.post("/articles/create", articlesController.createArticle, (req, res) => {
    if (res.statusCode === 201) { // Check if the article was successfully created
        sendNotification({
            message: "New article created",
            articleTitle: req.body.title,
            authorId: req.body.authorId
        });
    }
    res.status(res.statusCode).json(res.locals.article || { error: "Failed to create article" });
});





module.exports = router;
