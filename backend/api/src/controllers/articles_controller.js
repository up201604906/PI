const articlesModel = require('../models/articles_model');

const getArticlesByUser = async (req, res) => {
    try {
        
        const userId = req.params.id;  // Assume user ID is passed as a URL parameter
        if(!userId) {
            res.status(400).send("User ID is required");
            return;
        }
        const articles = await articlesModel.getArticlesByUser(userId);
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await articlesModel.getArticles();
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
};

const getArticleById = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await articlesModel.getArticleById(articleId);
        if (!article) {
            res.status(404).send("Article not found");
            return;
        }
        res.json(article);
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).send("Internal Server Error");
    }
}



const createArticle = async (req, res) => {
    try {
        //console.log("Creating article:", req.body);
        const newArticle = await articlesModel.createArticle(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        await articlesModel.deleteArticle(articleId);
        res.status(204).send();  // No Content
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getArticlesByUser,
    getAllArticles,
    getArticleById,
     createArticle,
     deleteArticle
};
