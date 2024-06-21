const express = require("express");
const controller = require("../controllers/controller");
const resourcesController = require("../controllers/resources_controller");
const articlesController = require('../controllers/articles_controller');
const userController = require('../controllers/user_controller');
const userAuth = require('../middlewares/user_auth');
const auth = require('../middlewares/auth');
const articlesModel = require('../models/articles_model');
const bibtexParse = require('bibtex-parse-js');
const wishlistController = require("../controllers/wishlist_controller");
const licensesController = require("../controllers/licenses_controller");
const pcAllocationController = require("../controllers/pcallocation_controller");
const thesesController = require("../controllers/theses_controller");
const areaController = require("../controllers/area_controller");

const router = express.Router();

/// ===================== ROUTES ===================== ///

// auth routes
router.post('/signup', userAuth.saveUser, userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get("/home", controller.getHome);

// Protected routes using auth middleware
// resources routes
router.get("/inventory/resources",auth ,resourcesController.getResources);
router.put("/inventory/resources/:id", auth, resourcesController.updateResource);
router.get("/inventory/resources/:name", resourcesController.getResourceByName);
router.delete("/inventory/resources/:name", auth, resourcesController.deleteResourceByName);
router.post("/inventory/createResource", auth, resourcesController.createResource);

// user routes
router.get("/user-mgmt", auth, userController.getUsers);
router.get('/user/:id', auth, userController.getUserById);
router.get('/user-areas/:id', auth, userController.getUserAreas);
router.put('/user/:id', auth, userController.updateUser);
router.delete('/user/:id', auth, userController.deleteUser);

// articles routes
router.get("/getArticles/:id", articlesController.getArticlesByUser);
router.get("/articles", articlesController.getAllArticles);
router.get("/articles/:id", articlesController.getArticleById);
router.delete("/articles/:id", auth, articlesController.deleteArticle);
router.post("/articles/create", auth, articlesController.createArticle, (req, res) => {
    if (res.statusCode === 201) { // Check if the article was successfully created
        sendNotification({
            message: "New article created",
            articleTitle: req.body.title,
            authorId: req.body.authorId
        });
    }
    res.status(res.statusCode).json(res.locals.article || { error: "Failed to create article" });
});
router.get('/articles/:id/export', auth, async (req, res) => {
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

// wishlist routes
router.get("/inventory/wishlist", auth, wishlistController.getWishlist);
router.delete("/inventory/wishlist/:user_name/:resource_name/:potential_resource_name", auth, wishlistController.deleteResourceFromWishlist);
router.put("/inventory/wishlist/:user_name/:resource_name/:potential_resource_name", auth, wishlistController.updateResourceInWishlist);
router.post("/inventory/wishlist/moveToResources", auth, wishlistController.moveToResources);
router.post("/inventory/addToWishlist", auth, wishlistController.addResourceToWishlist);

// licenses routes
router.get("/inventory/licenses", auth, licensesController.getLicenses);
router.put("/inventory/licenses/:id", auth, licensesController.updateLicense);
router.get("/inventory/licenses/:id", auth, licensesController.getLicenseById);
router.delete("/inventory/licenses/:id", auth, licensesController.deleteLicenseById);
router.post("/inventory/createLicense", auth, licensesController.createLicense);

// pc allocation routes
router.get("/inventory/pcallocation", auth, pcAllocationController.getPCAllocations);
router.put("/inventory/pcallocation/:id", auth, pcAllocationController.updatePCAllocation);
router.get("/inventory/pcallocation/:id", auth, pcAllocationController.getPCAllocationById);
router.delete("/inventory/pcallocation/:id", auth, pcAllocationController.deletePCAllocationById);
router.post("/inventory/createPCAllocation", auth, pcAllocationController.createPCAllocation);

// theses routes
router.get("/theses",thesesController.getTheses);
router.get("/thesis/:id",thesesController.getThesisById);
router.put("/thesis/:id", auth, thesesController.updateThesis);
router.delete("/thesis/:id", auth, thesesController.deleteThesisById);
router.post("/createThesis", auth, thesesController.createThesis);

// areas routes
router.get("/areas",areaController.getAreas);

module.exports = router;
