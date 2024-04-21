const pool = require("./database");  // Ensure you have a configured database connection

const getArticlesByUser = async (userId) => {
    const query = 'SELECT * FROM articles';
    const result = await pool.query(query);
    return result.rows;
};

const createArticle = async (articleData) => {
    const { title, year, type, publisher, pages, volume, number, organization, reference, abstract, keywords, cite, state } = articleData;
    const query = `
        INSERT INTO articles (title, year, type, publisher, pages, volume, number, organization, reference, abstract, keywords, cite)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;
    `;
    const values = [title, year, type, publisher, pages, volume, number, organization, reference, abstract, keywords, cite];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    getArticlesByUser,
    createArticle
};
