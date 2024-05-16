const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");
const articlesController = require('../controllers/articles_controller');
const userController = require('../controllers/user_controller');
const userAuth = require('../middlewares/user_auth');
const articlesModel = require('../models/articles_model');
const bibtexParse = require('bibtex-parse-js');
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
router.get('/articles/:id/export', async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await articlesModel.getArticleById(articleId);

        if (!article) {
            res.status(404).send('Article not found');
            return;
        }

        const bibtexEntry = {
            citationKey: article.cite || `${article.type}_${article.id}`,
            entryType: article.type,
            entryTags: {
                title: article.title,
                year: article.year.toString(),
                journal: article.journal,
                booktitle: article.booktitle,
                publisher: article.publisher,
                address: article.address,
                pages: article.pages,
                volume: article.volume ? article.volume.toString() : undefined,
                number: article.number ? article.number.toString() : undefined,
                series: article.series,
                month: article.month,
                note: article.note,
                url: article.url,
                doi: article.doi,
                isbn: article.isbn,
                howpublished: article.howpublished,
                organization: article.organization,
                abstract: article.abstract,
                keywords: article.keywords,
                reference: article.reference,
                author: article.authors,
                editor: article.editors,
            }
        };

        // Remove undefined fields
        Object.keys(bibtexEntry.entryTags).forEach(key => {
            if (!bibtexEntry.entryTags[key]) {
                delete bibtexEntry.entryTags[key];
            }
        });

        const bibtexString = bibtexParse.toBibtex([bibtexEntry]);

        res.setHeader('Content-Disposition', `attachment; filename="${article.title}.bib"`);
        res.setHeader('Content-Type', 'application/x-bibtex');
        res.send(bibtexString);
    } catch (error) {
        console.error('Error exporting article as BibTeX:', error);
        res.status(500).send('Internal Server Error');
    }
});





module.exports = router;
