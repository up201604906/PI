const pool = require('./database');

// Get all projects associated with a user
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

// Get a specific project by its ID
const getProjectById = async (projectId) => {
    const query = 'SELECT * FROM projects WHERE id = $1';
    const values = [projectId];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Get all projects
const getAllProjects = async () => {
    const query = 'SELECT * FROM projects';
    const result = await pool.query(query);
    return result.rows;
};

// Create a new project
const createProject = async (projectData) => {
    const {
        name, acronym, description, state, website, start_date, end_date, funding,
        funding_reference, external_partners, time, media, project_type_id, project_status_id, created_by
    } = projectData;

    const query = `
        INSERT INTO projects (
            name, acronym, description, state, website, start_date, end_date, funding,
            funding_reference, external_partners, time, media, project_type_id, project_status_id, created_by, created_at
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP
        ) RETURNING *;
    `;
    const values = [
        name, acronym, description, state, website, start_date, end_date, funding,
        funding_reference, external_partners, time, media, project_type_id, project_status_id, created_by
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Associate a user with a project
const associateUserWithProject = async (projectId, userId) => {
    const query = `
        INSERT INTO user_projects (user_id, project_id)
        VALUES ($1, $2);
    `;
    const values = [userId, projectId];
    await pool.query(query, values);
};

// Get all project types
const getProjectTypes = async () => {
    const query = 'SELECT * FROM project_types';
    const result = await pool.query(query);
    return result.rows;
};

// Get all project statuses
const getProjectStatuses = async () => {
    const query = 'SELECT * FROM project_status';
    const result = await pool.query(query);
    return result.rows;
};

// Get all team members of a project
const getTeamMembersByProject = async (projectId) => {
    const query = `
        SELECT rt.* FROM research_team rt
        JOIN project_research_team prt ON rt.id = prt.research_team_id
        WHERE prt.project_id = $1;
    `;
    const values = [projectId];
    const result = await pool.query(query, values);
    return result.rows;
};

// Get all assignments of a project
const getAssignmentsByProject = async (projectId) => {
    const query = `
        SELECT * FROM project_assignments
        WHERE project_id = $1;
    `;
    const values = [projectId];
    const result = await pool.query(query, values);
    return result.rows;
};

// Get all sharing & communication links of a project
const getSharingCommunicationByProject = async (projectId) => {
    const query = `
        SELECT * FROM sharing_communication
        WHERE project_id = $1;
    `;
    const values = [projectId];
    const result = await pool.query(query, values);
    return result.rows;
};

module.exports = {
    getProjectsByUser,
    getProjectById,
    getAllProjects,
    createProject,
    associateUserWithProject,
    getProjectTypes,
    getProjectStatuses,
    getTeamMembersByProject,
    getAssignmentsByProject,
    getSharingCommunicationByProject
};
