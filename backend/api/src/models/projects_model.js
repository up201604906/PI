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
        funding_reference, external_partners, media, project_type_id, project_status_id, created_by
    } = projectData;

    const query = `
        INSERT INTO projects (
            name, acronym, description, state, website, start_date, end_date, funding,
            funding_reference, external_partners, media, project_type_id, project_status_id, created_by, created_at
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, CURRENT_TIMESTAMP
        ) RETURNING *;
    `;
    const values = [
        name, acronym, description, state, website, start_date, end_date, funding,
        funding_reference, external_partners, media, project_type_id, project_status_id, created_by
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

const getRecentProjects = async (limit) => {
    const query = `
        SELECT 
            p.*, 
            pt.type_name, 
            ps.status_name
        FROM projects p
        LEFT JOIN project_types pt ON p.project_type_id = pt.id
        LEFT JOIN project_status ps ON p.project_status_id = ps.id
        ORDER BY p.created_at DESC
        LIMIT $1;
    `;
    const values = [limit];
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

const updateAssignment = async (assignmentId, description, assignee_id, due_date , status) => {
    const query = 'UPDATE project_assignments SET description = $1, assignee = $2, due_date = $4, status = $5 WHERE id = $3';
    const values = [description, assignee_id, assignmentId,due_date,status];
    await pool.query(query, values);
};

const deleteAssignment = async (assignmentId) => {
    const query = 'DELETE FROM project_assignments WHERE id = $1';
    const values = [assignmentId];
    await pool.query(query, values);
};

const updateSharingLink = async (linkId, link_type, link_url) => {
    const query = 'UPDATE sharing_communication SET link_type = $1, link_url = $2 WHERE id = $3';
    const values = [link_type, link_url, linkId];
    await pool.query(query, values);
};

const deleteSharingLink = async (linkId) => {
    const query = 'DELETE FROM sharing_communication WHERE id = $1';
    const values = [linkId];
    await pool.query(query, values);
};

const removeTeamMember = async (memberId) => {
    const query = 'DELETE FROM project_research_team WHERE research_team_id = $1';
    const values = [memberId];
    await pool.query(query, values);
};

const createAssignment = async ({ project_id, description, assignee_id, due_date, status }) => {
    const query = `
        INSERT INTO project_assignments (project_id, description, assignee, due_date, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [project_id, description, assignee_id, due_date, status];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const createSharingLink = async ({ project_id, link_type, link_url }) => {
    const query = `
        INSERT INTO sharing_communication (project_id, link_type, link_url)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [project_id, link_type, link_url];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const createTeamMember = async ({ project_id, name, field, email, optional_email, capacity, user_id }) => {
    let query = `
      INSERT INTO research_team (name, field, email, optional_email, capacity, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
  
    let values = [name, field, email, optional_email, capacity, user_id];
  

    if (!user_id) {
      query = `
        INSERT INTO research_team (name, field, email, optional_email, capacity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      values = [name, field, email, optional_email, capacity];
    }
  
    const result = await pool.query(query, values);
    const teamMember = result.rows[0];
  
    const associationQuery = `
      INSERT INTO project_research_team (project_id, research_team_id)
      VALUES ($1, $2);
    `;
    const associationValues = [project_id, teamMember.id];
    await pool.query(associationQuery, associationValues);
  
    return teamMember;
  };
  

  const updateProject = async (projectId, projectData) => {
    const {
      name,
      acronym,
      description,
      state,
      website,
      start_date,
      end_date,
      funding,
      funding_reference,
      external_partners,
      media,
      created_by,
      project_type_id,
      project_status_id
    } = projectData;
  
    const query = `
      UPDATE projects
      SET
        name = $1,
        acronym = $2,
        description = $3,
        state = $4,
        website = $5,
        start_date = $6,
        end_date = $7,
        funding = $8,
        funding_reference = $9,
        external_partners = $10,
        media = $11,
        created_by = $12,
        project_type_id = $13,
        project_status_id = $14
      WHERE id = $15
      RETURNING *;
    `;
  
    const values = [
      name,
      acronym,
      description,
      state,
      website,
      start_date,
      end_date,
      funding,
      funding_reference,
      external_partners,
      media,
      created_by,
      project_type_id,
      project_status_id,
      projectId
    ];
  
    const result = await pool.query(query, values);
    return result.rows[0];
  };

  const deleteProject = async (projectId) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Delete related records in other tables
        await client.query('DELETE FROM user_projects WHERE project_id = $1', [projectId]);
        await client.query('DELETE FROM project_assignments WHERE project_id = $1', [projectId]);
        await client.query('DELETE FROM sharing_communication WHERE project_id = $1', [projectId]);
        await client.query('DELETE FROM project_research_team WHERE project_id = $1', [projectId]);

        // Delete the project
        const query = 'DELETE FROM projects WHERE id = $1';
        await client.query(query, [projectId]);

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
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
    getSharingCommunicationByProject,
    updateAssignment,
    deleteAssignment,
    updateSharingLink,
    deleteSharingLink,
    removeTeamMember,
    getRecentProjects,
    createAssignment,
    createSharingLink,
    createTeamMember,
    updateProject,
    deleteProject
};
