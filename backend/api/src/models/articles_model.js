const pool = require("./database");  // Ensure you have a configured database connection

const getArticlesByUser = async (userId) => {
    const query = 'SELECT * FROM articles WHERE user_id = $1';
    const values = [userId]; // Set the parameter array with the userId
    const result = await pool.query(query, values); // Pass the values as the second argument to pool.query
    return result.rows;
};

const getArticles = async () => {
    const query = 'SELECT * FROM articles';
    const result = await pool.query(query);
    return result.rows;
};

const createArticle = async (articleData) => {
    const { title, year, type, publisher, pages, volume, number, organization, reference, abstract, keywords, cite, userId } = articleData;
    const query = `
        INSERT INTO articles (title, year, type, publisher, pages, volume, number, organization, reference, abstract, keywords, cite, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
    `;
    const values = [title, year, type, publisher, pages, volume, number, organization, reference, abstract, keywords, cite, userId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getArticleById = async (articleId) => {
    const query = 'SELECT * FROM articles WHERE id = $1';
    const values = [articleId];
    const result = await pool.query(query, values);
    return result.rows[0];
};


module.exports = {
    getArticlesByUser,
    getArticles,
    createArticle,
    getArticleById
};
