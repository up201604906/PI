const articlesModel = require('../models/articles_model');

const getArticles = async (req, res) => {
    try {
        const userId = req.params.userId;  // Assume user ID is passed as a URL parameter
        const articles = await articlesModel.getArticlesByUser(userId);
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
};

const createArticle = async (req, res) => {
    try {
        const newArticle = await articlesModel.createArticle(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    getArticles,
    createArticle
};
