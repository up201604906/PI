const pool = require("./database");  // Ensure you have a configured database connection

const getArticlesByUser = async (userId) => {
    const query = 'SELECT * FROM articles WHERE user_id = $1';
    const values = [userId];
    const result = await pool.query(query, values);

    for (let article of result.rows) {
        const authorsResult = await pool.query(`
            SELECT a.name FROM authors a
            JOIN article_authors aa ON a.id = aa.author_id
            WHERE aa.article_id = $1;
        `, [article.id]);
        article.authors = authorsResult.rows.map(row => row.name).join(' and ');

        const editorsResult = await pool.query(`
            SELECT e.name FROM editors e
            JOIN article_editors ae ON e.id = ae.editor_id
            WHERE ae.article_id = $1;
        `, [article.id]);
        article.editors = editorsResult.rows.map(row => row.name).join(' and ');
    }

    return result.rows;
};

const getArticleAuthors = async (articleId) => {
    const authorsResult = await pool.query(`
        SELECT a.name FROM authors a
        JOIN article_authors aa ON a.id = aa.author_id
        WHERE aa.article_id = $1;
    `, [articleId]);
    return authorsResult.rows.map(row => row.name);
};

const getArticleEditors = async (articleId) => {
    const editorsResult = await pool.query(`
        SELECT e.name FROM editors e
        JOIN article_editors ae ON e.id = ae.editor_id
        WHERE ae.article_id = $1;
    `, [articleId]);
    return editorsResult.rows.map(row => row.name);
};

const getArticleById = async (articleId) => {
    const query = 'SELECT * FROM articles WHERE id = $1';
    const values = [articleId];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
        let article = result.rows[0];

        article.authors = await getArticleAuthors(article.id);
        article.editors = await getArticleEditors(article.id);

        return article;
    }

    return null;
};

const getArticles = async () => {
    const query = 'SELECT * FROM articles';
    const result = await pool.query(query);
    const articles = result.rows;

    for (let article of articles) {
        article.authors = await getArticleAuthors(article.id);
        article.editors = await getArticleEditors(article.id);
    }

    return articles;
};

const createArticle = async (articleData) => {
    const {
        title, year, type, journal, booktitle, publisher, address, pages,
        volume, number, series, month, note, url, doi, isbn, howpublished,
        organization, reference, abstract, keywords, cite, userId, authors, editors
    } = articleData;

    const query = `
        INSERT INTO articles (
            title, year, type, journal, booktitle, publisher, address, pages, volume,
            number, series, month, note, url, doi, isbn, howpublished, organization,
            reference, abstract, keywords, cite, user_id
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
            $18, $19, $20, $21, $22, $23
        ) RETURNING *;
    `;
    const values = [
        title, year, type, journal || null, booktitle || null, publisher || null, address || null, pages || null, volume || null,
        number || null, series || null, month || null, note || null, url || null, doi || null, isbn || null, howpublished || null, organization || null,
        reference || null, abstract || null, keywords || null, cite || null, userId || null
    ];

    const result = await pool.query(query, values);
    const articleId = result.rows[0].id;

    // Insert authors
    if (authors) {
        for (const author of authors) {
            await pool.query(`INSERT INTO authors (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id;`, [author]);
            const authorResult = await pool.query(`SELECT id FROM authors WHERE name = $1;`, [author]);
            const authorId = authorResult.rows[0].id;
            await pool.query(`INSERT INTO article_authors (article_id, author_id) VALUES ($1, $2);`, [articleId, authorId]);
        }
    }

    // Insert editors
    if (editors) {
        for (const editor of editors) {
            await pool.query(`INSERT INTO editors (name) VALUES ($1) ON CONFLICT (name) DO NOTHING RETURNING id;`, [editor]);
            const editorResult = await pool.query(`SELECT id FROM editors WHERE name = $1;`, [editor]);
            const editorId = editorResult.rows[0].id;
            await pool.query(`INSERT INTO article_editors (article_id, editor_id) VALUES ($1, $2);`, [articleId, editorId]);
        }
    }

    return result.rows[0];
};

const deleteArticle = async (articleId) => {
    const query = 'DELETE FROM articles WHERE id = $1';
    const values = [articleId];
    await pool.query(query, values);
};

module.exports = {
    getArticlesByUser,
    createArticle,
    getArticles,
    getArticleById,
    deleteArticle  
};