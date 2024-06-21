const pool = require('./database');

async function create_user(name, email, password, permission) {
    try {
        const result = await pool.query(
            'INSERT INTO users (name, contact_email, password, permission) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, password, permission]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error; // re-throw the error to be handled elsewhere
    }
}

// Check if a username or email already exists
const doesUserExist = async (name, email) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM users WHERE name = $1 OR contact_email = $2',
        [name, email]
    );
    return result.rows[0].count > 0;
};

const get_user_by_id = async (userId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};

const get_user_by_email = async (email) => {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE contact_email = $1',
            [email]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching user by name or email:", error);
        throw error;
    }
};

const get_all_users = async () => {
    try {
        const result = await pool.query(`SELECT id, name, contact_email, personal_email, permission, picture FROM users`);
        return result.rows;
    } catch (error) {
        console.error("Error fetching user by name or email:", error);
        throw error;
    }
};

const get_user_areas = async (userId) => {
    try {
        const result = await pool.query(`
            SELECT pt.type_name
            FROM user_project_type upt
                     JOIN project_types pt ON upt.project_type_id = pt.id
            WHERE upt.user_id = $1;
        `, [userId]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching user areas:", error);
        throw error;
    }
};

const update_user = async (userId, name, contact_email, personal_email, phone_number, password, permission) => {
    try {
        const result = await pool.query(
            `UPDATE users
             SET name = $1,
                 contact_email = $2,
                 personal_email = $3,
                 phone_number = $4,
                 password = $5,
                 permission = $6
             WHERE id = $7
             RETURNING *`,
            [name, contact_email, personal_email, phone_number, password, permission, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

const get_area_id = async (area) => {
    try {
        const result = await pool.query(
            `SELECT id FROM project_types WHERE type_name = $1`,
            [area]
        );
        if (result.rows.length > 0) {
            return result.rows[0].id;
        } else {
            throw new Error(`No project type found for type_name: ${area}`);
        }
    } catch (error) {
        console.error("Error fetching area id:", error);
        throw error;
    }
}

const update_user_areas = async (userId, areas) => {
    try {
        await pool.query(
            `DELETE FROM user_project_type WHERE user_id = $1`,
            [userId]
        );

        for (let area of areas) {
            let areaId = await get_area_id(area.type_name);
            await pool.query(
                `INSERT INTO user_project_type (user_id, project_type_id) VALUES ($1, $2)`,
                [userId, areaId]
            );
        }

        return areas;
    } catch (error) {
        console.error("Error updating user areas:", error);
        throw error;
    }
}

const delete_user = async (userId) => {
    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }

}

const getUsersWithProjectTypes = async () => {
    const query = `
        SELECT u.id, u.name, u.contact_email, u.personal_email, u.phone_number, pt.type_name
        FROM users u
        LEFT JOIN user_project_type upt ON u.id = upt.user_id
        LEFT JOIN project_types pt ON upt.project_type_id = pt.id
    `;
    const result = await pool.query(query);
    return result.rows;
};


module.exports = {
    doesUserExist,
    create_user,
    get_all_users,
    get_user_by_id,
    get_user_by_email,
    get_user_areas,
    update_user,
    update_user_areas,
    delete_user,
    getUsersWithProjectTypes
};
