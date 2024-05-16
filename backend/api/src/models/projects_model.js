const pool = require('./database');

const getProjectsByUser = async (userId) => {
    const query = `
        SELECT p.* FROM projects p
        JOIN user_projects up ON p.id = up.project_id
        WHERE up.user_id = $1;
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
};

const getProjectById = async (projectId) => {
    const query = 'SELECT * FROM projects WHERE id = $1';
    const values = [projectId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const createProject = async (projectData) => {
    const {
        name, acronym, description, state, website, start_date, end_date, funding,
        funding_reference, external_partners, time, media
    } = projectData;

    const query = `
        INSERT INTO projects (
            name, acronym, description, state, website, start_date, end_date, funding,
            funding_reference, external_partners, time, media
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
        ) RETURNING *;
    `;
    const values = [
        name, acronym, description, state, website, start_date, end_date, funding,
        funding_reference, external_partners, time, media
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const associateUserWithProject = async (projectId, userId) => {
    const query = `
        INSERT INTO user_projects (user_id, project_id)
        VALUES ($1, $2);
    `;
    const values = [userId, projectId];
    await pool.query(query, values);
};

module.exports = {
    getProjectsByUser,
    getProjectById,
    createProject,
    associateUserWithProject
};
